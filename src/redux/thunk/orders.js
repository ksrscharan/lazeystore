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
                paymentStatus: "Unpaid"
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