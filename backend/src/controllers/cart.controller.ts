import { Request, Response } from "express";

export const getCartProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
  } catch (error: any) {}
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
  } catch (error: any) {}
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
