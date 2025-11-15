import express from 'express'

import { productCreate, productsGet, productDelete, productUpdate } from '../controllers/productController.js'

const router = express.Router();
router.post('/create', productCreate)
router.post('/update', productUpdate)
router.get('/get', productsGet)
router.post('/delete', productDelete)

export default router