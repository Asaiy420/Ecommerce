import mongoose from "mongoose";

interface IUser extends mongoose.Document{
    username: string
    email:string
    password:string
    cartItems: Array<any>
    profilePicture:string
    createdAt: Date
    updatedAt: Date
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [20, "Username must be less than 20 characters long"],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email address"
        ],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 8 characters long"],
    },
    cartItem: [
        {
            quanitity: {
                type: Number,
                default: 1,
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product",
            }
        }
    ]
}, {timestamps: true});


const User = mongoose.model<IUser>("User", userSchema);