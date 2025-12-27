import mongoose from "mongoose";
import { connectDB } from "../helpers/mongoConnect.js";
import { userSchema } from "../schema/userSchema.js";
import { productSchema } from "../schema/productSchema.js";

connectDB();

const UserModel = mongoose.model('User', userSchema);
const ProductModel = mongoose.model('Product', productSchema);

export const submitReview = async (productId, user, rating, reviewTitle, reviewComment) => {
  const alreadyReviewed = await ProductModel.findOne({
    _id: productId,
    "reviews.user": user.id
  });

  if (alreadyReviewed) throw new Error("You already reviewed this Product.");

  return await ProductModel.findByIdAndUpdate(
    productId,
    {
      $push: {
        reviews: {
          user: user.id,
          rating,
          reviewTitle,
          reviewComment,
          createdAt: new Date()
        }
      }
    },
    { new: true, runValidators: true }
  );
};

export const addItemToWishlist = async (productDetails, user) => {
  const isProductInWishlist = await UserModel.findOne({
    _id: user.id,
    "wishlist.productId": productDetails._id
  })
  if (isProductInWishlist) {
    throw new Error("Product Already exists in the wishlist")
  }
  return await UserModel.findByIdAndUpdate(user.id, {
    $addToSet: {
      wishlist: {
        productId: productDetails._id,
        category: productDetails.category,
        subCategory: productDetails.subCategory,
        addedAt: new Date()
      }
    }
  },
    { new: true, runValidators: true }
  );
}
export const removeItemFromWishlist = async (productDetails, user) => {
  const isProductInWishlist = await UserModel.findOne({
    _id: user.id,
    "wishlist.productId": productDetails._id

  })
  if (!isProductInWishlist) {
    throw new Error("Product not in Wishlist")
  }
  return await UserModel.findByIdAndUpdate(user.id, {
    $pull: { wishlist: { productId: productDetails._id } }
  },
    { new: true, runValidators: true }
  );
}

export const addItemToCart = async (productDetails, user) => {
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: user.id, "cart.productId": productDetails._id },
    { $inc: { "cart.$.quantity": 1 } },
    { new: true }
  );
  if (!updatedUser) {
    return await UserModel.findByIdAndUpdate(
      user.id,
      {
        $push: {
          cart: {
            productId: productDetails._id,
            category: productDetails.category,
            subCategory: productDetails.subCategory,
            quantity: 1,
            addedAt: new Date()
          }
        }
      },
      { new: true, runValidators: true }
    );
  }
  return updatedUser;
};
export const removeItemFromCart = async (productDetails, user) => {
  const itemInCart = await UserModel.findOne({
    _id: user.id,
    "cart.productId": productDetails._id
  });
  if (!itemInCart) {
    throw new Error("Item is not in the cart")
  }
  return await UserModel.findByIdAndUpdate(user.id, {
    $pull: { cart: { productId: productDetails._id } }
  },
    { new: true, runValidators: true }
  );
}
export const reduceQuantityCart = async (productDetails, user) => {
  const userDoc = await UserModel.findOne({
    _id: user.id,
    "cart.productId": productDetails._id
  });

  if (!userDoc) return null;

  const cartItem = userDoc.cart.find(
    (item) => item.productId.toString() === productDetails._id.toString()
  );

  if (cartItem && cartItem.quantity > 1) {
    return await UserModel.findOneAndUpdate(
      { _id: user.id, "cart.productId": productDetails._id },
      { $inc: { "cart.$.quantity": -1 } },
      { new: true }
    );
  } else {
    return await UserModel.findByIdAndUpdate(
      user.id,
      { $pull: { cart: { productId: productDetails._id } } },
      { new: true }
    );
  }
};