import { createSlice } from "@reduxjs/toolkit";

// 💾 SAVE TO LOCAL STORAGE
const saveToLocalStorage = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

// 📦 INITIAL STATE (LOAD FROM LOCAL STORAGE)
const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [], // { product, qty }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ➕ ADD TO CART
    addToCart: (state, action) => {
      const index = state.items.findIndex(
        (i) => i.product.id === action.payload.product.id
      );

      if (index >= 0) {
        state.items[index].qty += action.payload.qty;
      } else {
        state.items.push(action.payload);
      }

      saveToLocalStorage(state.items);
    },

    // ❌ REMOVE FROM CART
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.product.id !== action.payload);

      saveToLocalStorage(state.items);
    },

    // 🧹 CLEAR CART
    clearCart: (state) => {
      state.items = [];
      saveToLocalStorage(state.items);
    },

    // ➕ INCREMENT QTY
    incrementQty: (state, action) => {
      const index = state.items.findIndex(
        (i) => i.product.id === action.payload
      );

      if (index >= 0) {
        state.items[index].qty += 1;
        saveToLocalStorage(state.items);
      }
    },

    // ➖ DECREMENT QTY
    decrementQty: (state, action) => {
      const index = state.items.findIndex(
        (i) => i.product.id === action.payload
      );

      if (index >= 0 && state.items[index].qty > 1) {
        state.items[index].qty -= 1;
        saveToLocalStorage(state.items);
      }
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
