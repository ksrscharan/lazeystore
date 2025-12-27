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
  const title = product.title;
  const existingProduct = await ProductModel.findOne({ title });
  if (existingProduct) {
    return null;
  }
  const newProduct = await ProductModel.create(product);
  return newProduct;
};

export const getProducts = async (skip = 0, limit = 15, sortBy = 'createdAt', sortOrder = 'desc') => {
  const sortDirection = sortOrder === 'asc' ? 1 : -1;
  const sortObject = {};
  sortObject[sortBy] = sortDirection;
  const products = await ProductModel.find({})
    .skip(skip)
    .limit(limit)
    .sort(sortObject);
  const totalCount = await ProductModel.countDocuments({})
  return {products, totalCount}
};

export const updateProduct = async (productId, updatedFields) => {
  const filter = { _id: productId };
  const update = { $set: updatedFields };
  const options = { new: true };
  const updatedProduct = await ProductModel.findOneAndUpdate(
    filter,
    update,
    options
  );
  return updatedProduct;
};

export const deleteProduct = async (productId) => {
  await ProductModel.findByIdAndDelete(productId);
};

export const getProductsByCategory = async (category, skip = 0, limit = 15, sortBy = 'createdAt', sortOrder = 'desc') => {
  const sortDirection = sortOrder === 'asc' ? 1 : -1;
  const sortObject = {};
  sortObject[sortBy] = sortDirection;
  const products = await ProductModel.find({ category: category })
    .skip(skip)
    .limit(limit)
    .sort(sortObject)
  const totalCount = await ProductModel.countDocuments({ category: category })

  return { products, totalCount };
};
export const getProductsByCategorySubCategory = async (category, subCategory, skip = 0, limit = 15, sortBy = 'createdAt', sortOrder = 'desc') => {
  const sortDirection = sortOrder === 'asc' ? 1 : -1;
  const sortObject = {};
  sortObject[sortBy] = sortDirection;
  const products = await ProductModel.find({
    category: category,
    subCategory: subCategory
  })
    .skip(skip)
    .limit(limit)
    .sort(sortObject);

  const totalCount = await ProductModel.countDocuments({
    category: category,
    subCategory: subCategory
  });

  return { products, totalCount };
};
export const getProductsBySubCategory = async (subCategory, skip = 0, limit = 15, sortBy = 'createdAt', sortOrder = 'desc') => {
  const sortDirection = sortOrder === 'asc' ? 1 : -1;
  const sortObject = {}
  sortObject[sortBy] = sortDirection
  const products = await ProductModel.find({ subCategory: subCategory }).skip(skip).limit(limit).sort(sortObject);
  const totalCount = await ProductModel.countDocuments({ subCategory: subCategory })

  return { products, totalCount }
};

export const getCategories = async () => {
  return await ProductModel.distinct('category')
}

export const getSubCategories = async () => {
  return await ProductModel.distinct('subCategory')
}
export const getSubCategoriesBasedOnCategory = async (category) => {
  return await ProductModel.distinct('subCategory', { category: category })
}

export const getProductsWithDiscounts = async (category, skip = 0, limit = 10, sortBy = 'createdAt', sortOrder = 'desc') => {
  const query = {
    available: true,
    category: category,
    $expr: {
      $gt: ["$markedPrice", "$salePrice"]
    }
  };
  const sortDirection = sortOrder === 'asc' ? 1 : -1;
  const sortObject = {};
  sortObject[sortBy] = sortDirection;

  const products = await ProductModel.find(query)
    .skip(skip)
    .limit(limit)
    .sort(sortObject);

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
  const products = await ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
  const totalCount = await ProductModel.countDocuments(query)

  return { products, totalCount }
}

export const searchProducts = async (searchTerm, skip = 0, limit = 10) => {
  const regex = new RegExp(searchTerm, "i");
  const query = {
    $or: [
      { title: { $regex: regex } },
      { description: { $regex: regex } },
      { subTitle: { $regex: regex } },
      { category: { $regex: regex } },
      { subCategory: { $regex: regex } },
    ],
  };

  const products = await ProductModel.find(query).skip(skip).limit(limit);
  const totalCount = await ProductModel.countDocuments(query);

  return { products, totalCount };
};
