import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosError from "@utils/axiosError";

type TResponse = {
  accessToken: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
};

type TRegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (registerFormData: TRegisterFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post<TResponse>(
        "http://localhost:5000/register",
        registerFormData
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosError(error));
    }
  }
);
export default actAuthRegister;
