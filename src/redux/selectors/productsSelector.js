import { createSelector } from '@reduxjs/toolkit';

const selectAllProducts = (state) => state.products.entities.products;
const selectCollections = (state) => state.products.byCollection;

// Dynamic Selector for any Carousel or List
export const selectProductsByCollection = (collectionKey) => 
    createSelector(
        [selectAllProducts, selectCollections],
        (entities, collections) => {
            const collection = collections[collectionKey];
            if (!collection) return { products: [], meta: {} };
            
            // Map the IDs to the actual product objects on the shelf
            const products = collection.ids.map(id => entities[id]);
            return {
                products,
                meta: collection.meta
            };
        }
    );

// Selector for the Active Product Detail page
export const selectCurrentProduct = (state) => {
    const id = state.products.productDetails.currentProductId;
    return state.products.entities.products[id] || null;
};