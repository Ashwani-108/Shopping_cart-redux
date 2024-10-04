import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorage } from "../utils/localStoageHelpers";

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
    // sortedData: []
  },
  reducers: {
    setCategoryProducts(state, action) {
      state.data = action.payload
    },
    setStatus(state, action) {
      state.status = action.payload
    },
    sortProducts(state,action){
      const filter = action.payload
        switch (filter) {
          case "A-Z":
            state.data = [...state.data].sort((a, b) => a.title.localeCompare(b.title));
            setLocalStorage("categoryFilteredItems", [...state.data]);
            console.log([...state.data],'state.data')
            break;
          case "Z-A":
            state.data = [...state.data].sort((a, b) => b.title.localeCompare(a.title));
            setLocalStorage("categoryFilteredItems", state.data);
            console.log(state.data,'reverse order')
            break;
          case "price-low-to-high":
            state.data = [...state.data].sort((a, b) => a.price - b.price);
            setLocalStorage("categoryFilteredItems", state.data);
            console.log(state.data,'price low to high')
            break;
          case "price-high-to-low":
            state.data = [...state.data].sort((a, b) => b.price - a.price);
            setLocalStorage("categoryFilteredItems", state.data);
            break;
          case "rating":
            state.data = [...state.data].sort((a, b) => b.rating.rate - a.rating.rate);
            setLocalStorage("categoryFilteredItems", state.data);
            break;
          default:
            state.data
        }  
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
