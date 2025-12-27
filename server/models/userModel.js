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

export const addAddress = async (id, address) => {
  if (address.isDefault) {
    await UserModel.findByIdAndUpdate(id, {
      $set: { "addresses.$[].isDefault": false }
    });
  }
  return await UserModel.findByIdAndUpdate(
    id,
    { $addToSet: { addresses: address } },
    { new: true, runValidators: true }
  );
};
export const removeAddress = async (userId, addressId) => {
  const address = await UserModel.findOne({
    _id: userId,
    "addresses._id": addressId
  })
  if (!address) {
    throw new Error("No Address Found")
  }
  return await UserModel.findByIdAndUpdate(
    userId,
    { $pull: { addresses: { _id: addressId } } },
    { new: true }
  );
};
