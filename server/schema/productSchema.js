import mongoose from 'mongoose'

export const productSchema = new mongoose.Schema({
    available: Boolean,
    availableCount: Number,
    description: String,
    imageUrl: Array,
    price: Number,
    title: String,
    subTitle: String,
    category: String,
    subCategory: String
});