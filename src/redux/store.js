import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice"
import wishSlice from "./slices/wishSlice"
import cartSlice from "./slices/cartSlice"


const productStore=configureStore({
    reducer:{
        ProductReducer:productSlice,
        wishReducer:wishSlice,
        cartReducer:cartSlice
    }

})

export default productStore