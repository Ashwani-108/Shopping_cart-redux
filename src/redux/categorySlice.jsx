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
    originalData: [],
    rating: [],
    price: [],
    status: CATEGORY_STATUSES.IDLE,
  },
  reducers: {
    setCategoryProducts(state, action) {
      state.data = action.payload;
      state.originalData = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    sortProducts(state, action) {
      const filter = action.payload;
      switch (filter) {
        case "A-Z":
          state.data = [...state.data].sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          setLocalStorage("categoryFilteredItems", [...state.data]);
          break;
        case "Z-A":
          state.data = [...state.data].sort((a, b) =>
            b.title.localeCompare(a.title)
          );
          setLocalStorage("categoryFilteredItems", state.data);
          break;
        case "price-low-to-high":
          state.data = [...state.data].sort((a, b) => a.price - b.price);
          setLocalStorage("categoryFilteredItems", state.data);
          break;
        case "price-high-to-low":
          state.data = [...state.data].sort((a, b) => b.price - a.price);
          setLocalStorage("categoryFilteredItems", state.data);
          break;
        case "rating":
          state.data = [...state.data].sort(
            (a, b) => b.rating.rate - a.rating.rate
          );
          setLocalStorage("categoryFilteredItems", state.data);
          break;
        default:
          state.data = [...state.data];
      }
    },
    // handleRatingChange(state, action) {
    //   const { checked, updatedRating } = action.payload;
    //   let newrating
    //   if (checked) {
    //     newrating = [newrating, updatedRating]
    //     const minRating = Math.min(newrating);
    //     const filteredData = state.data.filter((items) => {
    //       return Math.floor(items.rating.rate) >= minRating;
    //     });
    //     state.data = [...state.data,filteredData];
    //   } 
    //   else {
    //     newrating = newrating.filter((r) => r !== updatedRating);
    //     if (newrating.length > 0){
    //       const minRating = Math.min(newrating);
    //       const filteredData = state.data.filter((items) => {
    //         return Math.floor(items.rating.rate) >= minRating;
    //       });
    //       state.data = [...state.data,filteredData];
    //     } else {
    //       state.data = [...state.data];
    //     }
    //   }
    // },
    // handlePrice(state, action) {
    //   const { checked, updatedPrice } = action.payload;
    //   if (checked) {
    //     state.price = [...state.price, updatedPrice];
    //     const minPrice = Math.min(...state.price);
    //     const filteredData = state.data.filter((items) => {
    //       return Math.floor(items.price) >= parseInt(minPrice);
    //     });
    //     state.data = [...filteredData];
    //   } 
    //   else {
    //     state.price = state.price.filter((r) => r !== updatedPrice);
    //     if (state.price.length > 0) {
    //       const minPrice = Math.min(...state.price);
    //       const filteredData = state.data.filter((items) => {
    //         return Math.floor(items.price) >= minPrice;
    //       });
    //       state.data = [...filteredData];
    //     } else {
    //       state.data = [...state.originalData];
    //     }
    //   }
    // },
  },
});

export const {
  setCategoryProducts,
  setStatus,
  sortProducts,
  filterPrice,
  handleRatingChange,
  handlePrice,
} = categorySlice.actions;
export default categorySlice.reducer;

// Thunk function to fetch products based on category
export function fetchCategoryProducts(newcategory) {
  return async function fetchCategoryProductsThunk(dispatch) {
    dispatch(setStatus(CATEGORY_STATUSES.LOADING));
    try {
      const res = await fetch(
        `https://fakestoreapi.com/products/category/${newcategory}`
      );
      const data = await res.json();
      const deepCopy = JSON.parse(JSON.stringify(data));
      console.log(deepCopy,'deepCopy')
      dispatch(setCategoryProducts(deepCopy));
      dispatch(setStatus(CATEGORY_STATUSES.IDLE));
    } catch (err) {
      console.error(err);
      dispatch(setStatus(CATEGORY_STATUSES.ERROR));
    }
  };
}
