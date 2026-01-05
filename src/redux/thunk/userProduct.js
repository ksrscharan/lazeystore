import axios from 'axios'
import { } from '../reducers/userDetailsSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'


const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/userProducts`

export const addToWishlist = createAsyncThunk(
    'user/addToWishlist',
    async (productDetails, { getState, rejectWithValue }) => {
        const state = getState();
        const ACCESS_TOKEN = state.accessToken.token;
        try {
            const response = await axios.post(
                `${BASE_URL}/wishlist/add`,
                { productDetails },
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`
                    },
                    withCredentials: true
                }
            );
            console.log(response.data);

            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const removeFromWishlist = createAsyncThunk(
    'user/removeFromWishlist',
    async (productDetails, { getState, rejectWithValue }) => {
        const state = getState();
        const ACCESS_TOKEN = state.accessToken.token;
        try {
            console.log(productDetails);

            const response = await axios.post(`${BASE_URL}/wishlist/remove`,
                { productDetails },
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`
                    },
                    withCredentials: true
                }
            )
            console.log(response.data);
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const addToCart = createAsyncThunk(
    'user/addToCart',
    async (productDetails, { getState, rejectWithValue }) => {
        const state = getState();
        const ACCESS_TOKEN = state.accessToken.token;
        try {
            const response = await axios.post(
                `${BASE_URL}/cart/add`,
                { productDetails },
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`
                    },
                    withCredentials: true
                }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const removeFromCart = createAsyncThunk(
    'user/removeFromCart',
    async (productDetails, { getState, rejectWithValue }) => {
        const state = getState();
        const ACCESS_TOKEN = state.accessToken.token;
        try {
            const response = await axios.delete(`${BASE_URL}/cart/remove`, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                },
                data: {
                    productDetails
                },
                withCredentials: true
            });
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const reduceFromCart = createAsyncThunk(
    'user/reduceFromCart',
    async (productDetails, { getState, rejectWithValue }) => {
        const state = getState();
        const ACCESS_TOKEN = state.accessToken.token;
        try {
            const response = await axios.patch(`${BASE_URL}/cart/reduce`, {
                productDetails
            }, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                },
                withCredentials: true
            })
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const getUser = createAsyncThunk(
    'user/get',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const ACCESS_TOKEN = state.accessToken.token;
            if (!ACCESS_TOKEN) return rejectWithValue("No token found");
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/auth/user`, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                }
            }
            )
            console.log(response.data);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);

        }
    }
)


