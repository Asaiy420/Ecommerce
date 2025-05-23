import mongoose from "mongoose"

interface ICoupon extends mongoose.Document{
    _id: mongoose.Types.ObjectId,
    code: string;
    discountPercentage: number;
    expirationDate: Date;
    isActive: boolean;
    userId: mongoose.Types.ObjectId;
}

const couponSchema = new mongoose.Schema({
    code : {
        type: String,
        required: true,
        unique: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique:true,
    }
}, {timestamps: true})

const Coupon = mongoose.model<ICoupon>("Coupon", couponSchema)

export default Coupon;