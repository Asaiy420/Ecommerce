import { Request, Response } from "express";
import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      message: "Products fetched successfully",
      products: products,
    });
  } catch (error: any) {
    console.log("Error in getProducts controller", error.message);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product with this id does not exist" });
      return;
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product: product,
    });
  } catch (error: any) {
    console.log("Error in getProductById controller", error.message);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, price, description, image, category } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    if (!name || !price || !description || !image || !category) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const product = await Product.create({
      name,
      price,
      description,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product: product,
    });
  } catch (error: any) {
    console.log("Error in createProduct controller", error.message);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, price, description, image, category } = req.body;
    const { id } = req.params;

    if (!name || !price || !description || !image || !category) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      res.status(404).json({ error: "Product with this id does not exist" });
      return;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        image,
        category,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (error: any) {
    console.log("Error in updateProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      res.status(404).json({ error: "Product with this ID does not exist" });
      return;
    }

    if (existingProduct.image) {
      const publicId = existingProduct.image.split("/").pop()?.split(".")[0]; // will get the id of the image

      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("deleted image from cloudinary")
      } catch (error: any) {
        console.error("Error when deleting the image ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
    const deletedProduct = await Product.findByIdAndDelete(id);

    res.status(200).json({
      message: "Product deleted successfully!",
      product: deletedProduct,
    });
  } catch (error: any) {
    console.log("Error in delete product controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFeaturedProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cachedKey = await redis.get("featured_products");

    if (cachedKey) {
      res.json(JSON.parse(cachedKey));
      return;
    }

    const featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts) {
      res.status(404).json({ error: "NO featured products found" });
      return;
    }

    await redis.set("featured_products", JSON.stringify(featuredProducts));

    res.json(featuredProducts);
  } catch (error: any) {
    console.log("Error in getFeatured controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
