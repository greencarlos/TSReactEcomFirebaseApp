import { createSlice, configureStore } from "@reduxjs/toolkit";

export interface CartItemInterface {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
      sessionStorage.setItem("cart", JSON.stringify(state.value));
    },
    removeItem(state, action) {
      const item = state.find((ele) => action.payload.id === ele.id);
      const idx = state.indexOf(item);
      state.splice(idx, 1);
      sessionStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart(state) {
      sessionStorage.setItem("cart", JSON.stringify([]));
			state.length = 0
    }
  },
});

export const { addToCart, removeItem, clearCart } = cartSlice.actions;

export const store = configureStore({
  reducer: cartSlice.reducer,
});
