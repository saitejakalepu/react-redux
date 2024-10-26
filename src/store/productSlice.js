// src/store/productSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define initial state
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Create an async thunk for fetching products
//createAsyncThunk -  api life cycle- returns pending , fullfilled or rejected
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  }
);

// Create a slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  //async operations needs to be added in extrareducers
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
