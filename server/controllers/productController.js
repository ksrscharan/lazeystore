import {
  createProduct,
  deleteProduct,
  findProductById,
  findProductByTitle,
  getProducts,
  updateProduct,
  findProductBySlug,
  getCategories,
  getProductsByCategory,
  getProductsWithDiscounts,
  getSubCategories,
  getProductsByCategorySubCategory,
  getProductsBySubCategory,
  getLatestProductsByCategory,
  getSubCategoriesBasedOnCategory,
  searchProducts
} from '../models/productModel.js';

export const productCreate = async (req, res) => {
  try {
    const product = req.body;
    const existingProduct = await findProductByTitle(product.title);
    if (!product || !product.title) {
      return res.status(400).json({ message: 'Product data is missing.' });
    }
    if (existingProduct) {
      return res
        .status(409)
        .json({ message: 'Product with same title already exists' });
    }
    await createProduct(product);
    return res.status(201).json({ message: 'Created SuccessFully' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const productsGet = async (req, res) => {
  try {
    const products = await getProducts();
    if (products) {
      return res.status(200).json(products);
    }
    return res.status(400).json({ message: 'No Products to fetch' });
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Couldn't fetch Products ${e.message}` });
  }
};

export const productUpdate = async (req, res) => {
  try {
    const { id, updateFields } = req.body;
    const existingProduct = await findProductById(id);
    if (!existingProduct) {
      return res.status(400).json({ message: `No Product with ID: ${id}` });
    }
    await updateProduct(id, updateFields);
    return res.status(201).json({ message: 'Updated Successfully' });
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Error Updating Product: ${e.message}` });
  }
};

export const productDelete = async (req, res) => {
  try {
    const id = req.body;
    const existingProduct = await findProductById(id);
    if (!existingProduct) {
      return res.status(400).json({ message: `No Product with ID: ${id}` });
    }
    await deleteProduct(id);
    return res.status(200).json({ message: `Deleted Product with ID ${id}` });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const getProductsCategory = async (req, res) => {
  const category = req.params.category;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const { products, totalCount } = await getProductsByCategory(category, skip, limit);
    if (products) {
      return res.status(200).json({
        data: products,
        meta: {
          totalProducts: totalCount,
          currentPage: page,
          productsPerPage: limit,
          totalPages: Math.ceil(totalCount / limit)
        }
      });
    }
    return res.status(400).json({ message: 'No Matching Products Found!' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getProductsSubCategory = async (req, res) => {
  const subCategory = req.params.subCategory;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const { products, totalCount } = await getProductsBySubCategory(subCategory, skip, limit);
    if (products) {
      return res.status(200).json({
        data: products,
        meta: {
          totalProducts: totalCount,
          currentPage: page,
          productsPerPage: limit,
          totalPages: Math.ceil(totalCount / limit)
        }
      });
    }
    return res.status(400).json({ message: 'No Matching Products Found!' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getProductsCategorySubCategory = async (req, res) => {
  const category = req.params.category;
  const subCategory = req.params.subCategory;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const { products, totalCount } = await getProductsByCategorySubCategory(category, subCategory, skip, limit);
    if (products) {
      return res.status(200).json({
        data: products,
        meta: {
          totalProducts: totalCount,
          currentPage: page,
          productsPerPage: limit,
          totalPages: Math.ceil(totalCount / limit)
        }
      });
    }
    return res.status(400).json({ message: 'No Matching Products Found!' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getProductCategories = async (req, res) => {
  try {
    const categories = await getCategories();
    return res.status(200).json(categories)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export const getProductSubCategories = async (req, res) => {
  try {
    const subCategories = await getSubCategories();
    return res.status(200).json(subCategories)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export const getSubCategoriesByCategory = async (req, res) => {
  const category = req.params.category
  try {
    const subCategories = await getSubCategoriesBasedOnCategory(category)
    return res.status(200).json(subCategories)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }

}


export const getDiscountedProducts = async (req, res) => {
  const category = req.query.category;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  if (!category) {
    return res.status(400).json({ message: "Category query parameter is required." });
  }
  try {
    const { products, totalCount } = await getProductsWithDiscounts(category, skip, limit);
    return res.status(200).json({
      data: products,
      meta: {
        totalProducts: totalCount,
        currentPage: page,
        productsPerPage: limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


export const getProductDetailsBySlug = async (req, res) => {
  const slug = req.body
  const product = await findProductBySlug(slug);
  try {
    return res.status(200).json(product)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}
export const getProductDetailsById = async (req, res) => {
  const id = req.body
  const product = await findProductById(id);
  try {
    return res.status(200).json(product)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getLatestProducts = async (req, res) => {
  const category = req.params.category
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;
  if (!category) {
    return res.status(400).json({ message: "Category query parameter is required." });
  }
  try {
    const { products, totalCount } = await getLatestProductsByCategory(category, skip, limit)
    return res.status(200).json({
      data: products,
      meta: {
        totalProducts: totalCount,
        currentPage: page,
        productsPerPage: limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const productSearch = async (req, res) => {
  const searchTerm = req.query.searchTerm
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;
  try {
    const { products, totalCount } = await searchProducts(searchTerm, skip, limit)
    if (products) {
      return res.status(201).json({
        data: products,
        meta: {
          totalProducts: totalCount,
          currentPage: page,
          productsPerPage: limit,
          totalPages: Math.ceil(totalCount / limit)
        }
      })
    }
    return res.status(400).json({message: "No Products to Fetch"})
  } catch (e) {
    return res.status(500).json({message: e.message})
  }
}