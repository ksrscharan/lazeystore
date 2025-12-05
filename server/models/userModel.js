import mongoose from 'mongoose';

import { userSchema } from '../schema/userSchema.js';
import { connectDB } from '../helpers/mongoConnect.js';

connectDB();

const UserModel = mongoose.model('User', userSchema);

export const createUser = async (user) => {
  const newUser = await UserModel.create(user);
  return newUser;
};

export const findUserByEmail = async (email) => {
  return await UserModel.findOne({ email: email }).select("+password");
};

export const findUserById = async (id) => {
  return await UserModel.findOne({ _id: id });
};

export const deleteUser = async (email) => {
  await UserModel.deleteOne({ email: email });
};
