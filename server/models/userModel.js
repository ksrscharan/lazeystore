// TODO: Access Users from Mongo:
import mongoose from 'mongoose';

import { userSchema } from '../schema/userSchema.js';

mongoose.connect('mongodb://localhost:27017/lazeystore', {}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

const UserModel = mongoose.model('User', userSchema);

// let users = [];

export const createUser = async (user) => {
    // users.push(user);
    const newUser = await UserModel.create(user)
    return newUser;
};

export const findUserByEmail = async (email) => {
    // return users.find((user) => user.email === email);
    return await UserModel.findOne({ email: email });
};

export const findUserById = async (id) => {
    return await UserModel.findOne({ _id: id });
};


export const deleteUser = async (email) => {
    await UserModel.deleteOne({ email: email });
};
