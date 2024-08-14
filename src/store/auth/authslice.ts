import { createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";
import { isString, TLoading } from "@types";
interface IAuth {
  accessToken: string | null;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  loading: TLoading;
  error: null | string;
}
const initialState: IAuth = {
  accessToken: null,
  user: null,
  loading: "idle",
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUi: (state) => {
      state.error = null;
      state.loading = "idle";
    },
    authLogout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthRegister.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.loading = "failed";
      isString(action.payload)
        ? (state.error = action.payload)
        : (state.error = "an unexpected error");
    });
    // login
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      isString(action.payload)
        ? (state.error = action.payload)
        : (state.error = "an unexpected error");
    });
  },
});
export const { resetUi, authLogout } = authSlice.actions;
export default authSlice.reducer;
export { actAuthRegister, actAuthLogin };
