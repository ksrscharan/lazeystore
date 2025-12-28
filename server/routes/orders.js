import express from 'express';
import {
    createNewOrder,
    deleteUserOrder,
    getOrderDetails,
    getOrders,
    getOrdersByDeliveryStatus,
    updateUserOrder
} from '../controllers/ordersController.js';
import { authorizeUser } from '../middleware/userAuthorization.js';
import { authorizeAdmin } from '../middleware/adminAuthorization.js';

const router = express.Router();

router.use(authorizeUser);

router.post('/new', createNewOrder);
router.get('/all', getOrders);
router.post('/details', getOrderDetails);
router.post('/status', getOrdersByDeliveryStatus);
router.patch('/update', updateUserOrder);
router.patch('/admin/update', authorizeAdmin, updateUserOrder);
router.delete('/delete', deleteUserOrder);

export default router;