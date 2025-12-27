import { addUserAddress, removeUserAddress } from '../controllers/userController.js'
import express from 'express';
import { authorizeUser } from '../middleware/userAuthorization.js'


const router = express.Router()

router.post('/address/add', authorizeUser, addUserAddress)
router.delete('/address/remove', authorizeUser, removeUserAddress)

export default router;
