import mongoose from 'mongoose';
import {addAddress, removeAddress} from '../models/userModel.js'
import { userSchema } from '../schema/userSchema.js';

const UserModel = mongoose.model('User', userSchema);

export const addUserAddress = async (req, res) => {
    const {address} = req.body;
    const user = req.user
    const updatedUser = await addAddress(user.id, address)
    try{

        if(!updatedUser) {
            return res.status(400).json({message: "User Not Found"})
        }
        return res.status(201).json({data: updatedUser, message: "Address added successfully"})
    }catch(e){
        return res.status(500).json({message: e.message})
    }
}
export const removeUserAddress = async (req, res) => {
    const {addressId} = req.body;
    const user = req.user
    const updatedUser = await removeAddress(user.id, addressId)
    try{

        if(!updatedUser) {
            return res.status(400).json({message: "User Not Found"})
        }
        return res.status(201).json({data: updatedUser, message: "Address removed successfully"})
    }catch(e){
        return res.status(500).json({message: e.message})
    }
}