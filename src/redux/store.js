import { configureStore } from "@reduxjs/toolkit";
import loginFormReducer from "./reducers/loginFormSlice";
import themeReducer from "./reducers/themeSlice";
import wishListReducer from "./reducers/wishListSlice";
import accessTokenReducer from "./reducers/accessTokenSlice";

const store = configureStore({
    reducer: {
        loginForm: loginFormReducer,
        theme: themeReducer,
        wishList: wishListReducer,
        accessToken: accessTokenReducer,
    },
});

export default store;
