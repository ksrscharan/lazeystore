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
      // 1. Navigation Data
      .addCase(fetchNavigationData.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.subCategories = action.payload.subCategories;
      })

      // 2. The Universal Collection Case (Replaces fetchAll and fetchCategory)
      .addCase(fetchListedProducts.fulfilled, (state, action) => {
        const { collectionKey, products, meta } = action.payload;

        state.byCollection[collectionKey] = { ids: [], meta: {}, loading: false }

        // Ensure the collection bucket exists
        if (!state.byCollection[collectionKey]) {
          state.byCollection[collectionKey] = { ids: [], meta: {}, loading: false };
        }
        // console.log(products)
        // Add products to the "Shelf"
        const newIds = products.data.map(product => {
          state.entities.products[product._id] = product;
          return product._id;
        });

        // Pagination Logic: Replace if first page, append if next pages
        if (!meta || meta.currentPage === 1) {
          state.byCollection[collectionKey].ids = newIds;
        } else {
          state.byCollection[collectionKey].ids.push(...newIds);
        }

        state.byCollection[collectionKey].meta = meta || {};
        state.byCollection[collectionKey].loading = false;
      })

      // 3. Product Details
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        const { product, relatedCategoryProducts, relatedSubCategoryProducts } = action.payload;

        // 1. Update the Main Product
        state.entities.products[product._id] = product;
        state.productDetails.currentProductId = product._id;

        // 2. Process Related Category (Store as an object with 'ids' for the selector)
        const categoryIds = relatedCategoryProducts.data.map(p => {
          state.entities.products[p._id] = p;
          return p._id;
        });
        // Change "relatedCategories" to "relatedCategory" to match your selector
        state.byCollection["relatedCategory"] = { ids: categoryIds, meta: {}, loading: false };

        // 3. Process Related SubCategory
        const subCategoryIds = relatedSubCategoryProducts.data.map(p => {
          state.entities.products[p._id] = p;
          return p._id;
        });
        // Change "relatedSubCategories" to "relatedSubCategory"
        state.byCollection["relatedSubCategory"] = { ids: subCategoryIds, meta: {}, loading: false };
      });
  }
});

export default productsSlice.reducer