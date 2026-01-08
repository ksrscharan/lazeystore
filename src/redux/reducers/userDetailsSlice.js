import { createSlice } from "@reduxjs/toolkit";
import { addToCart, addToWishlist, getUser, reduceFromCart, removeFromCart, removeFromWishlist } from '../thunk/userProduct'
import { initiateNewOrder } from "../thunk/orders";

const userDetailsSlice = createSlice({
    initialState: {
        user: {}
    },
    name: 'userDetails',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToWishlist.fulfilled, (state, action) => {
            state.user = action.payload
        }).addCase(removeFromWishlist.fulfilled, (state, action) => {
            state.user = action.payload
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.user = action.payload
        }).addCase(removeFromCart.fulfilled, (state, action) => {
            state.user = action.payload
        }).addCase(reduceFromCart.fulfilled, (state, action) => {
            state.user = action.payload
        }).addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload
        }).addCase(initiateNewOrder.fulfilled, (state, action)=> {
            // state.user
        })
    }
})

export default userDetailsSlice.reducer