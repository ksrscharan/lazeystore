import express from 'express';

import {
  getDiscountedProducts,
  getLatestProducts,
  getProductCategories,
  getProductsCategory,
  getProductsCategorySubCategory,
  getProductsSubCategory,
  getProductSubCategories,
  getSubCategoriesByCategory,
  productCreate,
  productDelete,
  productsGet,
  productUpdate,
  productSearch,
  getProductDetailsById,
  getProductDetailsBySlug
} from '../controllers/productController.js';
import { authorizeAdmin } from '../middleware/adminAuthorization.js'

const router = express.Router();
router.post('/create', authorizeAdmin, productCreate);
router.post('/update', authorizeAdmin, productUpdate);
router.get('/get', productsGet);
router.post('/delete', authorizeAdmin, productDelete);
router.get('/category/:category/:subCategory', getProductsCategorySubCategory);
router.get('/category/:category', getProductsCategory);
router.get('/subcategory/:subCategory', getProductsSubCategory);
router.get('/categories', getProductCategories);
router.get('/subcategories', getProductSubCategories);
router.get('/deals', getDiscountedProducts);
router.get('/latest/:category', getLatestProducts);
router.get('/:category/subcategories', getSubCategoriesByCategory);
router.get('/search', productSearch);
router.get('/details/slug/:slug', getProductDetailsBySlug); 
router.get('/details/id/:id', getProductDetailsById);     

export default router;
