import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
    name: "wishList",
    initialState: {
        items: [],
    },
    reducers: {
        addToWishList: (state, action) => {
            state.items.push(action.payload);
        },
        removeFromWishList: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
    },
});
export const { addToWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;