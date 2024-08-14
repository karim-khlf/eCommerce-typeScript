import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosError from "@utils/axiosError";
import axios from "axios";
type TResponse = {
  accessToken: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
};
type TLoginFormData = {
  email: string;
  password: string;
};

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (loginFormData: TLoginFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post<TResponse>(
        "http://localhost:5000/login",
        loginFormData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosError(error));
    }
  }
);

export default actAuthLogin;
