import { createSlice } from "@reduxjs/toolkit";
import { initiateNewOrder } from "../thunk/orders";

const ordersSlice = createSlice({
    initialState: {
        order: {}
    },
    name: "orders",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initiateNewOrder.fulfilled, (state, action) => {
            state.order = action.payload
        })
    }
})