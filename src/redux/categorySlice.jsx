import { createSlice } from "@reduxjs/toolkit";

export const CATEGORY_STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [], 
    status: CATEGORY_STATUSES.IDLE,
  },
  reducers: {
    setCategoryProducts(state, action) {
      state.data = action.payload
    },
    setStatus(state, action) {
      state.status = action.payload
    },
    sortProducts(state,action){
     
    }
    
  },
});

export const { setCategoryProducts, setStatus,sortProducts } = categorySlice.actions;
export default categorySlice.reducer;

// Thunk function to fetch products based on category
export function fetchCategoryProducts(newcategory) {
  return async function fetchCategoryProductsThunk(dispatch) {
    dispatch(setStatus(CATEGORY_STATUSES.LOADING));
    console.log(newcategory,'newcategory')
    try {
      const res = await fetch(`https://fakestoreapi.com/products/category/${newcategory}`);
      console.log(res, "res");
      const data = await res.json();
      console.log(data, "category data");
      dispatch(setCategoryProducts(data));
      dispatch(setStatus(CATEGORY_STATUSES.IDLE));
    } 
    catch (err) {
      console.error(err);
      dispatch(setStatus(CATEGORY_STATUSES.ERROR));
    }
  };
}
