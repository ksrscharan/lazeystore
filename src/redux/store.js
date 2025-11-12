import { configureStore } from '@reduxjs/toolkit';

import accessTokenReducer from './reducers/accessTokenSlice';
import loginFormReducer from './reducers/loginFormSlice';
import themeReducer from './reducers/themeSlice';
import wishListReducer from './reducers/wishListSlice';

const store = configureStore({
  reducer: {
    accessToken: accessTokenReducer,
    loginForm: loginFormReducer,
    theme: themeReducer,
    wishList: wishListReducer,
  },
});

export default store;
