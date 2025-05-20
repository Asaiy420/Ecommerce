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

export const login = async (req: Request, res: Response): Promise<void> => {};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken){
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as string | JwtPayload
      
      if (typeof decoded === "object" && "userId" in decoded){ // check if decoded is an object and has a userId property
        await redis.del(`refresh_token:${decoded.userId}`) // delete refresh token from redis
      }
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });

  } catch (error:any) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
