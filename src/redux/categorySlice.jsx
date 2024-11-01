import { createSelector, createSlice } from "@reduxjs/toolkit";
import { setLocalStorage } from "../utils/localStoageHelpers";

export const CATEGORY_STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const filterInitialState = {
  productList: [],
  filteredProductList: [],
  selectedPricings: [],
  selectedRatings: [],
  sortBy: "",
  status: CATEGORY_STATUSES.IDLE,
};

const categorySlice = createSlice({
  name: "category",
  initialState: filterInitialState,
  reducers: {
    setCategoryProducts(state, action) {
      state.productList = action.payload;
      state.filteredProductList = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    sortProducts(state, action) {
      const filter = action.payload;
      state.sortBy = filter;
    },
    setRatings(state, action) {
      const rating = action.payload;
      if (state.selectedRatings.includes(rating)) {
        state.selectedRatings = state.selectedRatings.filter(
          (r) => r !== rating
        );
      } else {
        state.selectedRatings.push(rating);
      }
    },
    setPricing(state, action) {
      const pricing = action.payload;
      if (state.selectedPricings.includes(pricing)) {
        state.selectedPricings = state.selectedPricings.filter(
          (r) => r !== pricing
        );
      } else {
        state.selectedPricings.push(pricing);
      }
    },
  },
});

export const selectFilteredProductList = createSelector(
  [(state) => state.category],
  (filterState) => {
    let products = [...filterState.productList];

    if (filterState.selectedRatings.length > 0) {
      const minRating = Math.min(...filterState.selectedRatings);
      products = products.filter((product) => product.rating.rate >= minRating);
    }

    if (filterState.selectedPricings.length > 0) {
      const minPricing = Math.min(...filterState.selectedPricings);
      products = products.filter((product) => product.price >= minPricing);
    }

    if (filterState.sortBy.length > 0) {
      switch (filterState.sortBy) {
        case "A-Z":
          products = [...products].sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          break;
        case "Z-A":
          products = [...products].sort((a, b) =>
            b.title.localeCompare(a.title)
          );
          break;
        case "price-low-to-high":
          products = [...products].sort((a, b) => a.price - b.price);
          break;
        case "price-high-to-low":
          products = [...products].sort((a, b) => b.price - a.price);
          break;
        case "rating":
          products = [...products].sort(
            (a, b) => b.rating.rate - a.rating.rate
          );
          break;
        default:
          products = [...products];
      }
      setLocalStorage("categoryFilteredItems", [...products]);
    }

    return products;
  }
);

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
      dispatch(setCategoryProducts(deepCopy));
      dispatch(setStatus(CATEGORY_STATUSES.IDLE));
    } catch (err) {
      console.error(err);
      dispatch(setStatus(CATEGORY_STATUSES.ERROR));
    }
  }
}

export const {
  setCategoryProducts,
  setStatus,
  sortProducts,
  setRatings,
  setPricing,
} = categorySlice.actions;

export default categorySlice.reducer;
