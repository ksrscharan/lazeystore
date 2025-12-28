import mongoose from "mongoose";
import { addressSchema } from "./userSchema.js";

export const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        slug: String,
        title: String,
        image: [String],
        purchasePrice: Number,
        quantity: { type: Number, default: 1 }
    }],
    shippingAddress: addressSchema,
    totalAmount: Number,
    deliveryStatus: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Unpaid', 'Refunded'],
        default: 'Unpaid'
    },
    createdAt: { type: Date, default: Date.now }
});