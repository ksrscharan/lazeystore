import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:3000/products';

export const fetchNavigationData = createAsyncThunk(
    'products/fetchNavigationData',
    async (_, { rejectWithValue }) => {
        try {
            const categoriesRes = await axios.get(`${BASE_URL}/categories`);
            const categories = categoriesRes.data;

            const subcatResponses = await Promise.all(
                categories.map((cat) =>
                    axios.get(`${BASE_URL}/${encodeURIComponent(cat)}/subcategories`)
                )
            );

            const subCategoriesMap = {};
            categories.forEach((cat, index) => {
                subCategoriesMap[cat] = subcatResponses[index].data;
            });

            return { categories, subCategories: subCategoriesMap };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const fetchListedProducts = createAsyncThunk(
    'products/fetchCollection',
    async ({ collectionKey, endpoint, params }) => {
        const response = await axios.get(endpoint, { params });

        return {
            collectionKey,
            products: response.data.products || response.data,
            meta: response.data.meta
        };
    }
);
export const fetchProductDetails = createAsyncThunk(
    'products/fetchDetails',
    async (slug, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${BASE_URL}/details/slug/${slug}`);
            console.log(res.data)
            const relatedCategoryProducts = await axios.get(`${BASE_URL}/category/${res.data.category}`, { sortBy: "createdAt", sortOrder: "asc" })
            const relatedSubCategoryProducts = await axios.get(`${BASE_URL}/category/${encodeURIComponent(res.data.category)}/${encodeURIComponent(res.data.subCategory)}`, { sortBy: "createdAt", sortOrder: "asc" })

            return {
                product: res.data,
                relatedCategoryProducts: relatedCategoryProducts.data,
                relatedSubCategoryProducts: relatedSubCategoryProducts.data
            };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


