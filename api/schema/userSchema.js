import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  houseNumber: String,
  street: String,
  landmark: String,
  area: String,
  state: String,
  pincode: String,
  isDefault: { type: Boolean, default: false }
}, { _id: true });

export const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    // phoneNumber: String, 

    role: {
      type: String,
      enum: ['user', 'admin', 'editor'],
      default: 'user',
    },


    orders: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
      },
    ],

    wishlist: [
      {
        productId: { type: mongoose.Schema.ObjectId, ref: 'Product' },
        category: String,
        subCategory: String,
        addedAt: { type: Date, default: Date.now }
      }
    ],

    cart: [
      {
        productId: { type: mongoose.Schema.ObjectId, ref: 'Product' },
        category: String,
        subCategory: String,
        quantity: { type: Number, default: 1 },
        addedAt: { type: Date, default: Date.now }
      }
    ],

    addresses: [addressSchema],

  },
  {
    timestamps: true,
  }
);