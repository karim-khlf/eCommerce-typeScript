import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";
import axiosError from "@utils/axiosError";

const actGetProductsByIds = createAsyncThunk(
  "cart/actGetProductsByIds",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, fulfillWithValue } = thunkAPI;
    const { cart } = getState() as RootState;
    const concatinatedItemsIds = Object.keys(cart.items)
      .map((el) => `id=${el}`)
      .join("&");
    const itemsIds = Object.keys(cart.items);
    try {
      if (!itemsIds.length) {
        return fulfillWithValue([]);
      }
      const res = await axios.get(
        `http://localhost:5000/products?${concatinatedItemsIds}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosError(error));
    }
  }
);

export default actGetProductsByIds;
