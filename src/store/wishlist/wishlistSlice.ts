import { createSlice } from "@reduxjs/toolkit";
import actToggleLike from "./act/actToggleLike";
import actGetWishlistProductsByIds from "./act/actGetWishlistProductsByIds";
import { TProduct, TLoading, isString } from "@types";
import { actAuthLogin, authLogout } from "@store/auth/authslice";

type TwishlistSliceInitialState = {
  itemsIds: number[];
  productsFullInfos: TProduct[];
  loading: TLoading;
  error: null | string;
};

const initialState: TwishlistSliceInitialState = {
  itemsIds: [],
  productsFullInfos: [],
  loading: "idle",
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    productsInfosCleanUp: (state) => {
      state.productsFullInfos = [];
    },
  },
  extraReducers: (builder) => {
    // toggleLike
    builder.addCase(actToggleLike.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actToggleLike.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload?.type === "delete") {
        state.itemsIds = state.itemsIds.filter(
          (el) => el !== action.payload?.id
        );
        state.productsFullInfos = state.productsFullInfos.filter(
          (el) => el.id !== action.payload?.id
        );
      } else {
        state.itemsIds.push(action.payload?.id as number);
      }
    });
    builder.addCase(actToggleLike.rejected, (state, action) => {
      state.loading = "failed";
      isString(action.payload) && (state.error = action.payload as string);
    });
    // GetWishlistProductsByIds
    builder.addCase(actGetWishlistProductsByIds.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlistProductsByIds.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload.dataType === "productsFullInfos") {
        state.productsFullInfos = action.payload.data;
      } else {
        state.itemsIds = action.payload.data;
      }
    });
    builder.addCase(actGetWishlistProductsByIds.rejected, (state, action) => {
      state.loading = "failed";
      isString(action.payload) && (state.error = action.payload as string);
    });
    // authLogout
    builder.addCase(authLogout, (state) => {
      state.itemsIds = [];
      state.productsFullInfos = [];
    });
  },
});
export const { productsInfosCleanUp } = wishlistSlice.actions;

export default wishlistSlice.reducer;
