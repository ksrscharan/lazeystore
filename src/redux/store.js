import { configureStore } from '@reduxjs/toolkit';

import accessTokenReducer from './reducers/accessTokenSlice';
import loginFormReducer from './reducers/loginFormSlice';
import themeReducer from './reducers/themeSlice';
import wishListReducer from './reducers/wishListSlice';
import signupFormReducer from './reducers/signupFormSlice'
import productsReducer from './reducers/productsSlice'

const store = configureStore({
  reducer: {
    accessToken: accessTokenReducer,
    loginForm: loginFormReducer,
    theme: themeReducer,
    wishList: wishListReducer,
    signupForm: signupFormReducer,
    products: productsReducer
  },
});

export default store;
