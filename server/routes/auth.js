import express from 'express';

import {
  createAccessToken,
  deleteAccount,
  getUserDetails,
  login,
  logout,
  signup,
} from '../controllers/authController.js';
import { authorizeUser } from '../middleware/userAuthorization.js';

const router = express.Router();
router.get('/createAccessToken', createAccessToken);
router.post('/deleteAccount', deleteAccount);
router.post('/login', login);
router.post('/logout', logout);
router.post('/signup', signup);
router.get('/user', authorizeUser, getUserDetails);

export default router;
