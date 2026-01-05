import { configureStore } from '@reduxjs/toolkit';

import accessTokenReducer from './reducers/accessTokenSlice';
import loginFormReducer from './reducers/loginFormSlice';
import productsReducer from './reducers/productsSlice';
import signupFormReducer from './reducers/signupFormSlice';
import themeReducer from './reducers/themeSlice';
import userDetails from './reducers/userDetailsSlice'

const store = configureStore({
  reducer: {
    accessToken: accessTokenReducer,
    loginForm: loginFormReducer,
    products: productsReducer,
    signupForm: signupFormReducer,
    theme: themeReducer,
    userDetails: userDetails
  },
});

export default store;
