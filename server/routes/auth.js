import express from 'express';

import {
  createAccessToken,
  deleteAccount,
  login,
  logout,
  signup,
} from '../controllers/authController.js';

const router = express.Router();
router.post('/createAccessToken', createAccessToken);
router.post('/deleteAccount', deleteAccount);
router.post('/login', login);
router.post('/logout', logout);
router.post('/signup', signup);

export default router;
