import {Request, Response} from "express";
import User from "../models/user.model.js";


export const signUp = async (req: Request, res: Response): Promise<void> =>{
    try {
        const {username, email, password} = req.body;

        if (!username || !email || !password) {
            res.status(400).json({message: "All fields are required"});
            return;
        };

        const existingUser = await User.findOne({ email });

        if (existingUser){
            res.status(400).json({message: "User with this email already exists"});
            return;
        }

        const user = await User.create({username, email, password});

        res.status(201).json({message: "User created successfully", user})
        

    } catch (error:any) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message: "Internal server error"});
        return;
    }
}

export const login = async (req: Request, res: Response): Promise<void> =>{
    
}

export const logout = async (req: Request, res: Response): Promise<void> =>{
    
}
