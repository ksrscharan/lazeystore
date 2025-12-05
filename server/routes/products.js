import express from 'express';

import {
  getDiscountedProducts,
  getLatestProducts,
  getProductCategories,
  getProductsCategory,
  getProductsCategorySubCategory,
  getProductsSubCategory,
  getProductSubCategories,
  productCreate,
  productDelete,
  productsGet,
  productUpdate,
} from '../controllers/productController.js';

const router = express.Router();
router.post('/create', productCreate);
router.post('/update', productUpdate);
router.get('/get', productsGet);
router.post('/delete', productDelete);
router.get('/category/:category/:subCategory', getProductsCategorySubCategory);
router.get('/category/:category', getProductsCategory);
router.get('/subcategory/:subCategory', getProductsSubCategory);
router.get('/categories', getProductCategories);
router.get('/subcategories', getProductSubCategories);
router.get('/deals', getDiscountedProducts);
router.get('/latest/:category', getLatestProducts);

export default router;
