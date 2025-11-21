import mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
  available: Boolean,
  availableCount: Number,
  category: String,
  description: String,
  imageUrl: Array,
  price: Number,
  subCategory: String,
  subTitle: String,
  title: String,
});
