import TLoading from "@types/TLoading.types";
import TProduct from "@types/TProduct.types";
import { isString } from "@types/guards";
import { createSlice } from "@reduxjs/toolkit";

import actGetProductsByIds from "./act/actGetProductsByIds";

type TInitialState = {
  items: { [key: number]: number };
  productsFullInfos: TProduct[];
  loading: TLoading;
  error: null | string;
};

const initialState: TInitialState = {
  items: {},
  productsFullInfos: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items[action.payload]
        ? state.items[action.payload]++
        : (state.items[action.payload] = 1);
    },
    changeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    deleteItem: (state, action) => {
      delete state.items[action.payload];
      state.productsFullInfos = state.productsFullInfos.filter(
        (el) => el.id !== action.payload
      );
    },
    cartProductsInfosCleaUp: (state) => {
      state.productsFullInfos = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByIds.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByIds.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInfos = action.payload;
    });
    builder.addCase(actGetProductsByIds.rejected, (state, action) => {
      state.loading = "failed";
      isString(action.payload) && (state.error = action.payload as string);
    });
  },
});
export const {
  addToCart,
  changeQuantity,
  deleteItem,
  cartProductsInfosCleaUp,
} = cartSlice.actions;

export default cartSlice.reducer;
