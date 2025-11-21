import express from 'express';

import {
  getProductsCategory,
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
router.get('/category/:category', getProductsCategory);

export default router;
