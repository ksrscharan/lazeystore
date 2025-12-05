import mongoose from 'mongoose';

import { productSchema } from '../schema/productSchema.js';
import { connectDB } from '../helpers/mongoConnect.js';

connectDB();

const ProductModel = mongoose.model('Product', productSchema);

export const findProductByTitle = async (title) => {
  return await ProductModel.findOne({ title });
};
export const findProductById = async (id) => {
  return await ProductModel.findById(id);
};
export const findProductBySlug = async (slug) => {
  return await ProductModel.findOne({ slug });
};

export const createProduct = async (product) => {
  const title = product;
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

export const getProductsByCategory = async (category, skip = 0, limit = 15) => {
  const products = await ProductModel.find({ category: category }).skip(skip).limit(limit)
  const totalCount = await ProductModel.countDocuments({ category: category })

  return { products, totalCount };
};
export const getProductsByCategorySubCategory = async (category, subCategory, skip = 0, limit = 15) => {
  const products = await ProductModel.find({
    category: category,
    subCategory: subCategory
  })
    .skip(skip)
    .limit(limit);

  // Use countDocuments for better performance
  const totalCount = await ProductModel.countDocuments({
    category: category,
    subCategory: subCategory
  });

  return { products, totalCount };
};
export const getProductsBySubCategory = async (subCategory, skip = 0, limit = 15) => {
  const products = await ProductModel.find({ subCategory: subCategory }).skip(skip).limit(limit);
  const totalCount = await ProductModel.countDocuments({ subCategory: subCategory })

  return { products, totalCount }
};

export const getCategories = async () => {
  return await ProductModel.distinct('category')
}

export const getSubCategories = async () => {
  return await ProductModel.distinct('subCategory')
}

export const getProductsWithDiscounts = async (category, skip = 0, limit = 10) => {
  // 1. Define the base query for discounted products
  const query = {
    available: true,
    category: category,
    $expr: {
      $gt: ["$markedPrice", "$salePrice"]
    }
  };

  // 2. Fetch the products with skip and limit
  const products = await ProductModel.find(query)
    .skip(skip)   // Skip this number of documents
    .limit(limit); // Return this number of documents

  // 3. (Optional but recommended) Get the total count for pagination info
  const totalCount = await ProductModel.countDocuments(query);

  return { products, totalCount };
}


export const getLatestProductsByCategory = async (category, skip = 0, limit = 10) => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const query = {
    available: true,
    category: category,
    createdAt: {
      $gte: oneMonthAgo
    }

  }
  const products = await ProductModel.find(query).skip(skip).limit(limit);
  const totalCount = await ProductModel.countDocuments(query)

  return { products, totalCount }
}