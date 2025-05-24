import { Request, Response } from "express";
import User from "../models/user.model.js";
import jwt, { JwtPayload } from "jsonwebtoken";

import "dotenv/config";
import { redis } from "../lib/redis.js";

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId: string, refreshToken: string) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    60 * 60 * 24 * 7
  );
};

const setCookies = (
  res: Response,
  refreshToken: string,
  accessToken: string
) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // prevent client side js from accessing the cookie
    secure: process.env.NODE_ENV === "production", // only send the cookie over https in production
    sameSite: "strict", // prevent csrf attacks
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
  });
};

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User with this email already exists" });
      return;
    }

    const user = await User.create({ username, email, password });

    // authenticate user

    const { accessToken, refreshToken } = generateTokens(user._id.toString());
    await storeRefreshToken(user._id.toString(), refreshToken); // store refresh token in redis

    setCookies(res, refreshToken, accessToken);

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    const isPasswordValid = await user.comparePassword(password); // compare the password with the hashed password

    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    const { accessToken, refreshToken } = generateTokens(user._id.toString());
    await storeRefreshToken(user._id.toString(), refreshToken);

    setCookies(res, refreshToken, accessToken);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      ) as string | JwtPayload;

      if (typeof decoded === "object" && "userId" in decoded) {
        // check if decoded is an object and has a userId property
        await redis.del(`refresh_token:${decoded.userId}`); // delete refresh token from redis
      }
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (error: any) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(400).json({ message: "No refresh token provided" });
      return;
    }
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as string | JwtPayload;

    let userId: string | undefined;

    if (typeof decoded === "object" && "userId" in decoded) {
      userId = decoded.userId;
    }

    if (!userId) {
      res.status(400).json({ message: "Invalid refresh token" });
      return;
    }

    const storedToken = await redis.get(`refresh_token:${userId}`);

    // check if the stored token is the same as the refresh token

    if (storedToken !== refreshToken) {
      res.status(400).json({ message: "Invalid refresh token" });
      return;
    }

    // generate new access token

    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "15m",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ message: "Access token refreshed successfully" });
  } catch (error: any) {
    console.log("Error in refresh token controller", error.message);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.json((req as any).user);
  } catch (error: any) {
    console.log("Error in getProfile controller");
    res.status(500).json({ error: "Intenal Server Error" });
  }
};
