import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productReducer";
const store = configureStore({
    reducer: { productReducer }
})

export default store;