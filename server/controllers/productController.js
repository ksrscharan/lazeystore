import {
  createProduct,
  deleteProduct,
  findProductById,
  findProductByTitle,
  findProductsByCategory,
  getProducts,
  updateProduct,
} from '../models/productModel.js';

export const productCreate = async (req, res) => {
  try {
    const product = req.body;
    const existingProduct = await findProductByTitle(product.title);
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: 'Product with same title already exists' });
    }
    await createProduct(product);
    return res.json(200).json({ message: 'Created SuccessFully' });
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
    return res.status(200).json({ message: 'Updated Successfully' });
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
  try {
    const products = await findProductsByCategory(category);
    if (products) {
      return res.status(200).json({ message: products });
    }
    return res.status(400).json({ message: 'No Matching Products Found!' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
