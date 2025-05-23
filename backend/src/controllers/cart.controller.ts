import { Request, Response } from "express";
import Product from "../models/product.model.js";

export const getCartProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const products = await Product.find({
      _id: { $in: (req as any).user.cartItems },
    });
    const cartItems = products.map((product) => {
      const item = (req as any).user.cartItems.find(
        (cartItem: any) => cartItem.id === product.id
      );
      return { ...product.toJSON(), quantity: item.quantity };
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

    const user = (req as any).user;

    const existingItem = user.cartItems.find(
      (item: any) => item.id === productId
    );

    if (existingItem) {
      existingItem.quantity = +1;
    } else {
      user.cartItems.push(productId);
    }

    await user.save();

    res.status(200).json(user.cartItems);
  } catch (error: any) {
    console.log("Error in addToCart controller", error.any);
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
      (item: any) => item.id === productId
    );

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter(
          (item: any) => item.id !== productId
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

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter(
        (item: any) => item.id !== productId
      );
    }

    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error: any) {
    console.log("Error in deleteAllFromCart controller");
    res.status(500).json({ error: "Internal Server Error" });
  }
};
