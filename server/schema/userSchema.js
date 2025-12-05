import mongoose from 'mongoose';

// Define the schema for the User
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
    firstName: { // Splitting name is better for personalization
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

    cart: {
      type: mongoose.Schema.ObjectId,
      ref: 'Cart',
    },

    wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
    ],

    addresses: [
      {
        street: String,
        city: String,
        state: String,
        pincode: String,
        isDefault: { type: Boolean, default: false }
      }
    ],

  },
  {
    timestamps: true,
  }
);