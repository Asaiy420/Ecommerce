import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import User from "../models/user.model.js";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as
      | string
      | JwtPayload;

    let userId: string | undefined;

    if (typeof decoded === "object" && "userId" in decoded) {
      userId = decoded.userId;
    }

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      res.status(401).json({ message: "Unauthorized - User not found" });
      return;
    }

    (req as any).user = user; // type assertion to tell typescript that req.user is of type User

    next();
  } catch (error: any) {
    console.log("Error in protectRoute middleware", error.message);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const adminRoute = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Forbidden - Admin access required" });
      return;
    }
  } catch (error: any) {
    console.log("Error in adminRoute middleware", error.message);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
