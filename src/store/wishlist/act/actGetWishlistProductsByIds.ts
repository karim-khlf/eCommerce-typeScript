import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosError from "@utils/axiosError";
import { RootState } from "@store/index";
import { TProduct } from "@types";
type TResponse = TProduct[];
type TFunctionType = "productsFullInfos" | "itemsIds";
const actGetWishlistProductsByIds = createAsyncThunk(
  "wishlist/actGetProductsByIds",
  async (functionType: TFunctionType, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `http://localhost:5000/wishlist?userId=${auth.user?.id}`
      );
      if (!userWishlist.data.length) {
        return { data: [], dataType: "empty" };
      }
      if (functionType === "itemsIds") {
        const itemsIds = userWishlist.data.map((el) => el.productId);
        return { data: itemsIds, dataType: "itemsIds" };
      } else {
        const concatinatedItemsIds = userWishlist.data
          .map((el) => `id=${el.productId}`)
          .join("&");
        const res = await axios.get<TResponse>(
          ` http://localhost:5000/products?${concatinatedItemsIds}`
        );
        return { data: res.data, dataType: "productsFullInfos" };
      }
    } catch (error) {
      return rejectWithValue(axiosError(error));
    }
  }
);

export default actGetWishlistProductsByIds;
