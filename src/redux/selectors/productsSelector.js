import { createSelector } from '@reduxjs/toolkit';

const selectAllProducts = (state) => state.products.entities.products;
const selectCollections = (state) => state.products.byCollection;

export const selectProductsByCollection = (collectionKey) => 
    createSelector(
        [selectAllProducts, selectCollections],
        (entities, collections) => {
            const collection = collections[collectionKey];
            if (!collection) return { products: [], meta: {} };
            
            const products = collection.ids.map(id => entities[id]);
            return {
                products,
                meta: collection.meta
            };
        }
    );

export const selectCurrentProduct = (state) => {
    const id = state.products.productDetails.currentProductId;
    return state.products.entities.products[id] || null;
};