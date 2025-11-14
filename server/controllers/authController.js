import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import {
  createUser,
  deleteUser,
  findUserByEmail,
} from '../models/userModel.js';
const bcrypt = await import('bcryptjs');
dotenv.config();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Account does not exist' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    if (req.cookies.refreshToken) {
      return res.status(200).json({ message: 'Already logged in' });
    }
    const refreshToken = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );

    const accessToken = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    return res
      .status(200)
      .json({ accessToken, message: 'Login successful', refreshToken, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (await findUserByEmail(email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      email,
      id: Date.now().toString(),
      name,
      password: hashedPassword,
    });
    const refreshToken = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );
    const accessToken = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    return res.status(201).json({
      accessToken,
      message: 'User created successfully',
      refreshToken,
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  if (!req.cookies.refreshToken) {
    return res.status(400).json({ message: 'User Not Signed In' });
  }

  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
  return res.status(200).json({ message: 'Logout successful' });
};

export const createAccessToken = (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      const accessToken = jwt.sign(
        { email: decoded.email, id: decoded.id },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
      );

      return res
        .status(200)
        .json({ accessToken, message: 'Access token created successfully' });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    const refreshToken = req.cookies.refreshToken;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Account does not exist' });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    
    
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      
      if (decoded.email !== email) {
        return res
          .status(403)
          .json({ message: 'Token email does not match requested account' });
      }

      
      await deleteUser(email);

      res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });

      
      return res.status(200).json({ message: 'Account deleted successfully' });
    });

    
    
  } catch (error) {
    
    return res.status(500).json({ message: error.message });
  }
};
