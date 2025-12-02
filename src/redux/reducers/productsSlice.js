import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
    initialState: {
        products: []
    },
    name: 'products',
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        pushProducts: (state, action) => {
            state.products.concat(action.payload);
        }
    }
})

export const { setProducts, pushProducts } = productsSlice.actions;
export default productsSlice.reducer;