import { Request, Response } from "express";
import Coupon from "../models/coupon.model.js";

export const getCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const coupon = await Coupon.findOne({
      userId: (req as any).user._id,
      isActive: true,
    });

    if (!coupon) {
      res.status(404).json({ message: "No coupon found" });
      return;
    }

    res.status(200).json(coupon);
  } catch (error: any) {
    console.log("Error in getCoupon controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const validateCoupon = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { code } = req.body;

    if (!code) {
      res
        .status(404)
        .json({ error: "No code found please enter the code to validate" });
      return;
    }

    const coupon = await Coupon.findOne({
      code: code,
      userId: (req as any).user._id,
      isActive: true,
    });

    if (!coupon) {
      res.status(404).json({ error: "No coupon found" });
      return;
    }

    if (coupon?.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      res.status(400).json({ error: "Coupon Expired!" });
    }

    res.status(200).json({
      message: "Coupon Valid!",
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
    });
  } catch (error: any) {
    console.log("Error in validate coupon controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
