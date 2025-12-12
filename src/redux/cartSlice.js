import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // { product, qty }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index = state.items.findIndex(
        (i) => i.product.id === action.payload.product.id
      );
      if (index >= 0) {
        state.items[index].qty += action.payload.qty;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    incrementQty: (state, action) => {
      const index = state.items.findIndex(
        (i) => i.product.id === action.payload
      );
      if (index >= 0) state.items[index].qty += 1;
    },
    decrementQty: (state, action) => {
      const index = state.items.findIndex(
        (i) => i.product.id === action.payload
      );
      if (index >= 0 && state.items[index].qty > 1) state.items[index].qty -= 1;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQty,
  decrementQty,
} = cartSlice.actions;

export default cartSlice.reducer;
