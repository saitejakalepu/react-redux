import { createSlice } from "@reduxjs/toolkit";
const myinitialState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  }
const cartSlice = createSlice({
  name: "cart",
  initialState:myinitialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalPrice += newItem.price;
    },
    increaseItemQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
      }
    },
    decreaseItemQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        } else {
          item.quantity -= 1;
        }
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      }
    },
    removeItemFromCart: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
      }
    },
  },
});

export const {
  addItemToCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItemFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
