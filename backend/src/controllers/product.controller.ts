import { Request, Response } from "express";
import Product from "../models/product.model.js";


export const getProducts = async (req:Request, res:Response): Promise<void> => {
    try{
        const products = await Product.find({}); 

        res.status(200).json({
            message: "Products fetched successfully",
            products: products,
        })

    }catch(error:any){
        console.log("Error in getProducts controller", error.message);
        res.status(500).json({message: "Internal server error"});
        return;
    }
}

export const getProductById = async (req:Request, res:Response): Promise<void> => {
    
}

export const createProduct = async (req:Request, res:Response): Promise<void> => {
    
}

export const updateProduct = async (req:Request, res:Response): Promise<void> => {
    
}

export const deleteProduct = async (req:Request, res:Response): Promise<void> => {
    
}