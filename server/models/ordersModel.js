import mongoose from 'mongoose';
import { orderSchema } from '../schema/ordersSchema.js';
import { connectDB } from '../helpers/mongoConnect.js';
import { userSchema } from '../schema/userSchema.js';

connectDB();

const OrderModel = mongoose.model("Order", orderSchema);
const UserModel = mongoose.model('User', userSchema);

export const newOrder = async (orderData, userId) => {
    const order = await OrderModel.create(orderData);
    if (order) {
        await UserModel.findByIdAndUpdate(userId, { $set: { cart: [] } });
        return order
    } else {
        throw new Error("Error creating Order")
    }
};

export const orderById = async (orderId, userId) => {
    return await OrderModel.findOne({
        _id: orderId,
        user: userId
    })
        .populate('user', 'firstName email')
        .populate('items.productId');
};

export const userOrders = async (userId) => {
    return await OrderModel.find({ user: userId })
        .populate('items.productId');
};

export const userOrdersByDeliveryStatus = async (userId, deliveryStatus) => {
    return await OrderModel.find({
        user: userId,
        status: deliveryStatus
    }).populate('items.productId');
};

export const updateOrder = async (userId, orderId, updatedFields) => {
    const filter = { _id: orderId, user: userId };
    const update = { $set: updatedFields };
    return await OrderModel.findOneAndUpdate(filter, update, { new: true });
};

export const deleteOrder = async (userId, orderId) => {
    return await OrderModel.findOneAndDelete({
        user: userId,
        _id: orderId
    });
};