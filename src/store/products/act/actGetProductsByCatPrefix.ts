import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import TProduct from "@customTypes/TProduct";
import axiosError from "@utils/axiosError";
type TResponse = TProduct[];

const actGetProductsByCatPrefix = createAsyncThunk(
  "products/actGetProductsByCatPrefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get<TResponse>(
        `http://localhost:5000/products?cat_prefix=${prefix}`
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(axiosError(error));
    }
  }
);
export default actGetProductsByCatPrefix;
