import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorage, getLocalStorage } from "../utils/localStoageHelpers";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getLocalStorage("cartItems", [])?.map((item) => ({...item,
      quantity:item.quantity !== undefined && item.quantity !== null
          ? item.quantity
          : 1,
    })),
    totalQuantity: getLocalStorage("totalQuantity") || 0,
    totalPrice: getLocalStorage("totalPrice", 0),
  },

  reducers: {
    add(state, action) {
      const existingItem = state.items?.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) {
        state.items?.push({ ...action.payload, quantity: 1 });
        state.totalQuantity += 1;
        state.totalPrice = state.items?.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        setLocalStorage("cartItems", state.items);
        setLocalStorage("totalQuantity", state.totalQuantity);
        setLocalStorage("totalPrice", state.totalPrice);
      }
    },

    inceaseQuantity(state, action) {
      const existingItem = state.items?.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice = state.items?.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        setLocalStorage("cartItems", state.items);
        setLocalStorage("totalQuantity", state.totalQuantity);
        setLocalStorage("totalPrice", state.totalPrice);
      }
    },

    decreaseQuantity(state, action) {
      const existingItem = state.items?.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem && existingItem.quantity > 0) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        }
        state.totalQuantity -= 1;
        state.totalPrice = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        setLocalStorage("cartItems", state.items);
        setLocalStorage("totalQuantity", state.totalQuantity);
        setLocalStorage("totalPrice", state.totalPrice);
      }
    },
    removeItem(state, action) {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.totalPrice = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        setLocalStorage("cartItems", state.items);
        setLocalStorage("totalQuantity", state.totalQuantity);
        setLocalStorage("totalPrice", state.totalPrice);
      }
    },
  },
});

export const {
  add,
  removeItem,
  inceaseQuantity,
  decreaseQuantity,
  totalQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
