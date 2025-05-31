import { Request, Response } from "express";
import Coupon from "../models/coupon.model.js";
import { stripe } from "../lib/stripe.js";
import "dotenv/config";
import Order from "../models/order.model.js";

export const createCheckOutSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      res.status(400).json({ error: "Invalid or empty products array" });
      return;
    }

    let totalAmount = 0;

    const lineItems = products.map((product: any) => {
      const amount = Math.round(product.price * 100); //stripe wants in format of cents
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity,
      };
    });

    let coupon = null;

    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: (req as any).user._id,
        isActive: true,
      });

      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cacel`,
      discounts: coupon
        ? [
            {
              coupon: await createStripeCoupon(coupon.discountPercentage),
            },
          ]
        : [],

      metadata: {
        userId: (req as any).user._id.toString(),
        couponCode: couponCode || "",
        products: JSON.stringify(
          products.map((p: any) => ({
            id: p._id,
            quantity: p.quantity,
            price: p.price,
          }))
        ),
      },
    });

    if (totalAmount >= 20000) {
      await createNewCoupon((req as any).user._id);
    }

    res.status(200).json({
      id: session.id,
      totalAmount: totalAmount / 100,
    });
  } catch (error: any) {
    console.log("Error in checkout controller", error.message);
    res.status(500).json({ error: "Interal Server Error" });
  }
};

export const checkSuccess = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      if (session.metadata?.couponCode) {
        await Coupon.findOneAndUpdate(
          {
            code: session.metadata.couponCode,
            userId: session.metadata.userId,
          },
          {
            isActive: false,
          }
        );

        // create a new order
        const products = JSON.parse(session.metadata.products);

        const newOrder = new Order({
          user: session.metadata.userId,
          products: products.map((product: any) => ({
            product: product.id,
            quantity: product.quantity,
            price: product.price,
          })),
          totalAmount: (session.amount_total as number) / 100,
          stripeSessionId: sessionId,
        });

        await newOrder.save();
      }
      // Add success response
      res.status(200).json({ success: true });
    } else {
      // Add error response for unpaid status
      res.status(400).json({ error: "Payment not completed" });
    }
  } catch (error: any) {
    console.log("Error in checkSuccess controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function createStripeCoupon(discountPercentage: number) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });
  return coupon.id;
}

async function createNewCoupon(userId: any) {
  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30d
    userId: userId,
  });
  await newCoupon.save();

  return newCoupon;
}
