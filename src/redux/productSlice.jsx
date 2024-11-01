import { createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [], 
    status: STATUSES.IDLE,
    singleProduct:[]
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setSingleProduct(state, action) {
      state.singleProduct = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setProducts, setStatus,setSingleProduct } = productSlice.actions;
export default productSlice.reducer;

export function fetchProducts() {
  return async function fetchProductThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));

    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      dispatch(setProducts(data));
      dispatch(setStatus(STATUSES.IDLE));
      console.log(data, "data");
    } catch (err) {
      console.error(err);
      dispatch(setStatus(STATUSES.ERROR));
    }

  }
}

export function singleProduct(productId) {
  return async function fetchProductThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));

    try {
      const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const data = await res.json();
      dispatch(setSingleProduct(data));
      dispatch(setStatus(STATUSES.IDLE));
      console.log(data, "data");
    } catch (err) {
      console.error(err);
      dispatch(setStatus(STATUSES.ERROR));
    }

  }
}


