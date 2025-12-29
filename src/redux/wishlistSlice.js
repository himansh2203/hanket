import { createSlice } from "@reduxjs/toolkit";

// Load wishlist from localStorage
const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("wishlistItems");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
};

// Save wishlist to localStorage
const saveToLocalStorage = (items) => {
  localStorage.setItem("wishlistItems", JSON.stringify(items));
};

const initialState = {
  items: loadFromLocalStorage(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveToLocalStorage(state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveToLocalStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveToLocalStorage(state.items);
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
