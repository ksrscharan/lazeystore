import {
    deleteOrder,
    newOrder,
    orderById,
    updateOrder,
    userOrders,
    userOrdersByDeliveryStatus
} from '../models/ordersModel'

export const createNewOrder = async (req, res) => {
    const { items, shippingAddress, totalAmount, deliveryStatus, paymentStatus } = req.body
    const userId = req.user.id
    const order = {
        user: userId,
        items: items,
        shippingAddress: shippingAddress,
        totalAmount: totalAmount,
        deliveryStatus: deliveryStatus,
        paymentStatus: paymentStatus
    }
    if (items.length < 1) {
        return res.status(400).json({ message: "Products Not Listed" })
    }
    try {
        const createdOrder = await newOrder(order, userId)
        if (!createdOrder) {
            return res.status(400).json({ message: "Order Not Created. Try Again" })
        }
        return res.status(200).json({ data: createdOrder, message: "order placed successfully" })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }

}
export const deleteUserOrder = async (req, res) => {
    const { orderId } = req.body;
    const userId = req.user.id;
    try {
        const deletedOrder = await deleteOrder(userId, orderId)
        if (!deletedOrder) {
            return res.status(400).json({ message: "Order not Found" })
        }
        return res.status(200).json({ message: "Order Deleted successfully" })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}
export const getOrderDetails = async (req, res) => {
    const { orderId } = req.body;
    const userId = req.user.id;
    try {
        const orderDetails = await orderById(orderId, userId)
        if (!orderDetails) {
            return res.status(400).json({ message: "Order not Found" })
        }
        return res.status(200).json({ data: orderDetails, message: "Order Fetched successfully" })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

export const updateUserOrder = async (req, res) => {
    const { orderId, updateFields } = req.body;
    const userRole = req.user.role;
    const userId = req.user.id;

    try {
        let updatedOrder;
        
        if (userRole === 'admin') {
            updatedOrder = await OrderModel.findByIdAndUpdate(
                orderId, 
                { $set: updateFields }, 
                { new: true }
            );
        } else {
            updatedOrder = await updateOrder(userId, orderId, updateFields);
        }

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not Found" });
        }
        return res.status(200).json({ data: updatedOrder, message: "Order updated successfully" });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

export const getOrders = async (req, res) => {
    const userId = req.user.id
    try {
        const orders = await userOrders(userId)
        if (!orders) {
            return res.status(400).json({ message: "Orders not Found" })
        }
        if (orders.length === 0) {
            return res.status(200).json({ data: [], message: "No orders found for this user" });
        }
        return res.status(200).json({ data: orders, message: "Orders Fetched successfully" })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}
export const getOrdersByDeliveryStatus = async (req, res) => {
    const { deliveryStatus } = req.body;
    const userId = req.user.id
    try {
        const orders = await userOrdersByDeliveryStatus(userId, deliveryStatus)
        if (!orders) {
            return res.status(400).json({ message: "Orders not Found" })
        }
        return res.status(200).json({ data: orders, message: `Orders Fetched successfully - ${deliveryStatus}` })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}
