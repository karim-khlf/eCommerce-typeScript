import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosError from "@utils/axiosError";
import { RootState } from "@store/index";

// type TResponse = {};
const actToggleLike = createAsyncThunk(
  "wishlist/actGetProductsInfosByIds",
  async (id: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const res = await axios.get(
        `http://localhost:5000/wishlist?productId=${id}`
      );
      const isProductExist = await res.data;
      if (isProductExist.length) {
        await axios.delete(
          `http://localhost:5000/wishlist/${isProductExist[0].id}`
        );
        return { type: "delete", id };
      } else {
        await axios.post("http://localhost:5000/wishlist", {
          userId: auth.user?.id,
          productId: id,
        });

        return { type: "add", id };
      }
    } catch (error) {
      return rejectWithValue(axiosError(error));
    }
  }
);

export default actToggleLike;
