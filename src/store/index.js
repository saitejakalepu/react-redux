import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";
import productReducer from "./productSlice";
import { createLogger } from "redux-logger";
import { thunk } from "redux-thunk";

const logger = createLogger();

const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger),
});

export default store;
