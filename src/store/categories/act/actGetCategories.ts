import TCategory from "@types/TCategory.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosError from "@utils/axiosError";

type TResponse = TCategory[];

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get<TResponse>(
        "http://localhost:5000/categories"
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(axiosError(error));
    }
  }
);
export default actGetCategories;
