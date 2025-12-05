import mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
  available: { type: Boolean, default: true },
  availableCount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  detailedDescription: String,
  imageUrl: [String],
  markedPrice: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  subCategory: String,
  subTitle: String,
  title: { type: String, required: true },
  brand: String,
  condition: { type: String, enum: ['New', 'Used', 'Refurbished'] },
  tags: [String],
  shippingWeightKg: Number,
  warrantyDuration: String,
  warrantyDetails: String,
  slug: { type: String, unique: true, required: true },
  metaDescription: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  reviews: [{ user: String, rating: String, review: String }]
});

productSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});