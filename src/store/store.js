import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "../features/cartSlice"
import stockSlice from "../features/stockSlice";
import userAuth from "../features/userAuth";
import stockistsSlice from "../features/stockistsSlice";
import transactionSlice from "../features/transactionSlice";
import adminSlice from "../features/adminSlice";

export const store = configureStore({
    reducer:{
        cart:cartSlice,
        stock: stockSlice,
        user: userAuth,
        stockist: stockistsSlice,
        transaction: transactionSlice,
        admin: adminSlice
    }
})