import mongoose from 'mongoose';

import { productSchema } from '../schema/productSchema.js';
import { connectDB } from './mongoConnect.js';

connectDB();

const ProductModel = mongoose.model('Product', productSchema);

export const findProductByTitle = async (title) => {
  return await ProductModel.findOne({ title });
};
export const findProductById = async (id) => {
  return await ProductModel.findById(id);
};

export const createProduct = async (product) => {
  const { title } = product.title;
  const existingProduct = await ProductModel.findOne({ title });
  if (existingProduct) {
    return null;
  }
  const newProduct = await ProductModel.create(product);
  return newProduct;
};

export const getProducts = async () => {
  return await ProductModel.find({});
};

export const updateProduct = async (productId, updatedFields) => {
  try {
    const filter = { _id: productId };
    const update = { $set: updatedFields };
    const options = { new: true };
    const updatedProduct = await ProductModel.findOneAndUpdate(
      filter,
      update,
      options
    );
    return updatedProduct;
  } catch (e) {
    console.log(`error updating: ${e}`);
  }
};

export const deleteProduct = async (productId) => {
  await ProductModel.findByIdAndDelete(productId);
};
