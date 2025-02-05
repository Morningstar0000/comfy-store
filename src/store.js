import { configureStore } from "@reduxjs/toolkit";

import CartReducer from './Features/cart/CartSlice'
import userReducer from './Features/Users/UserSlice'

export const store = configureStore({
    reducer:{
        cartState: CartReducer,
        userState: userReducer
    }
})