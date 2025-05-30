import { Request, Response } from "express";
import Product from "../models/product.model.js";
import { Document } from "mongoose";

type ProductDocument = Document & {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isFeatured: boolean;
};

export const getCartProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = (req as any).user;
    if (!user || !user.cartItems) {
      res.status(400).json({ error: "Invalid user or cart" });
      return;
    }

    const productIds = user.cartItems
      .filter((item: any) => item.product)
      .map((item: any) => item.product);

    if (productIds.length === 0) {
      return res.status(200).json([]);
    }

    const products = await Product.find({
      _id: { $in: productIds },
    });

    const cartItems = products.map((product) => {
      const item = user.cartItems.find(
        (cartItem: any) =>
          cartItem.product &&
          cartItem.product.toString() === (product as any)._id.toString()
      );
      return {
        id: (product as any)._id,
        name: (product as any).name,
        description: (product as any).description,
        price: (product as any).price,
        image: (product as any).image,
        quantity: item?.quantity || 0,
      };
    });
    return res.status(200).json(cartItems);
  } catch (error: any) {
    console.log("Error when getting cart products", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.body;

    if (!productId) {
      res.status(400).json({ error: "Product ID is required" });
      return;
    }

    const user = (req as any).user;
    if (!user || !user.cartItems) {
      res.status(400).json({ error: "Invalid user or cart" });
      return;
    }

    const existingItem = user.cartItems.find(
      (item: any) => item.product && item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ product: productId, quantity: 1 });
    }

    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error: any) {
    console.log("Error in addToCart controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

export const updateQuantity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = (req as any).user;

    const existingItem = user.cartItems.find(
      (item: any) => item.product.toString() === productId
    );

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter(
          (item: any) => item.product.toString() !== productId
        );
        await user.save();
        res.json(user.cartItems);
        return;
      }

      existingItem.quantity = quantity;
      await user.save();
      res.json(user.cartItems);
      return;
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error: any) {
    console.log("Error in update cart controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteAllFromCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.body;
    const user = (req as any).user;

    if (!user || !user.cartItems) {
      res.status(400).json({ error: "Invalid user or cart" });
      return;
    }

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter(
        (item: any) => item.product && item.product.toString() !== productId
      );
    }

    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error: any) {
    console.log("Error in deleteAllFromCart controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
