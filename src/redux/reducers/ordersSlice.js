import { createSlice } from "@reduxjs/toolkit";
import { getUserOrders, initiateNewOrder, getOrderDetails } from "../thunk/orders";

const ordersSlice = createSlice({
    initialState: {
        entities: {
            orders: {}
        },
        latestOrderId: null,
        currentOrderId: null,
        allOrders: null
    },
    name: "orders",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initiateNewOrder.fulfilled, (state, action) => {
            const order = action.payload.data
            state.entities.orders[order._id] = order
            state.latestOrderId = order._id
        }).addCase(getUserOrders.fulfilled, (state, action) => {
            const ordersArray = action.payload.data;

            if (ordersArray && Array.isArray(ordersArray)) {
                const newIds = ordersArray.map(order => {
                    state.entities.orders[order._id] = order;
                    return order._id;
                });
                state.allOrders = newIds;
            }
        }).addCase(getOrderDetails.fulfilled, (state, action) => {
            const order = action.payload.data
            state.entities.orders[order._id] = order
            state.currentOrderId = order._id
        })
    }
})

export default ordersSlice.reducer;