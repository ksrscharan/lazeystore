import { addToCart, addToWishlist, reduceProductQuantityCart, removeFromCart, removeFromWishlist, submitUserReview } from "../controllers/userProductController.js";
import { authorizeUser } from '../middleware/userAuthorization.js'
import express from 'express'

const router = express.Router();

router.post('/wishlist/add', authorizeUser, addToWishlist);
router.post('/wishlist/remove', authorizeUser, removeFromWishlist);

router.post('/cart/add', authorizeUser, addToCart);
router.patch('/cart/reduce', authorizeUser, reduceProductQuantityCart);
router.delete('/cart/remove', authorizeUser, removeFromCart);

router.post('/review', authorizeUser, submitUserReview);

export default router