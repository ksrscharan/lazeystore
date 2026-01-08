import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/orders`

export const initiateNewOrder = createAsyncThunk(
    "orders/initiateNewOrder",
    async ({ user, selectedAddress, totalAmount }, { getState, rejectWithValue }) => {
        const state = getState()
        const ACCESS_TOKEN = state.accessToken.token
        try {
            const response = await axios.post(`${BASE_URL}/new`, {
                items: user.cart.map(item => {
                    return {
                        productId: item.productId._id,
                        quantity: item.quantity,
                        purchasePrice: item.productId.salePrice
                    }
                }),
                shippingAddress: selectedAddress,
                totalAmount: totalAmount,
                deliveryStatus: "Pending",
                paymentStatus: "Paid"
            }, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                },
                withCredentials: true
            })
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)
export const getUserOrders = createAsyncThunk(
    "orders/getUserOrders", async (_, { getState, rejectWithValue }) => {
        const state = getState()
        const ACCESS_TOKEN = state.accessToken.token
        try {
            const response = await axios.get(`${BASE_URL}/all`, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                },
                withCredentials: true
            })
            console.log(response.data);

            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

export const getOrderDetails = createAsyncThunk(
    "order/getOrderDetails", async (orderId, { getState, rejectWithValue }) => {
        const state = getState()
        const ACCESS_TOKEN = state.accessToken.token
        try {
            const response = await axios.post(`${BASE_URL}/details`, {
                orderId: orderId
            }, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                },
                withCredentials: true
            })
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)