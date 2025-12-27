import { createSlice } from '@reduxjs/toolkit';
import { fetchListedProducts, fetchNavigationData, fetchProductDetails } from '../thunk/products'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    categories: [],
    subCategories: {},
    entities: {
      products: {}
    },
    byCollection: {},
    productDetails: {
      currentProductId: null,
    },
    loading: false,
    error: null
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSubCategories: (state, action) => {
      state.subCategories = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNavigationData.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.subCategories = action.payload.subCategories;
      })

      .addCase(fetchListedProducts.fulfilled, (state, action) => {
        const { collectionKey, products, meta } = action.payload;

        state.byCollection[collectionKey] = { ids: [], meta: {}, loading: false }

        if (!state.byCollection[collectionKey]) {
          state.byCollection[collectionKey] = { ids: [], meta: {}, loading: false };
        }
        const newIds = products.data.map(product => {
          state.entities.products[product._id] = product;
          return product._id;
        });

        if (!meta || meta.currentPage === 1) {
          state.byCollection[collectionKey].ids = newIds;
        } else {
          state.byCollection[collectionKey].ids.push(...newIds);
        }

        state.byCollection[collectionKey].meta = meta || {};
        state.byCollection[collectionKey].loading = false;
      })

      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        const { product, relatedCategoryProducts, relatedSubCategoryProducts } = action.payload;

        state.entities.products[product._id] = product;
        state.productDetails.currentProductId = product._id;

        const categoryIds = relatedCategoryProducts.data.map(p => {
          state.entities.products[p._id] = p;
          return p._id;
        });
        state.byCollection["relatedCategory"] = { ids: categoryIds, meta: {}, loading: false };

        const subCategoryIds = relatedSubCategoryProducts.data.map(p => {
          state.entities.products[p._id] = p;
          return p._id;
        });
        state.byCollection["relatedSubCategory"] = { ids: subCategoryIds, meta: {}, loading: false };
      });
  }
});

export default productsSlice.reducer