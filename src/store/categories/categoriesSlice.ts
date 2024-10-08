import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import TCategory from "@types/TCategory.types";
import TLoading from "@types/TLoading.types";
import { isString } from "@types/guards";
interface ICategoriesState {
  records: TCategory[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesRecordsCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      (state.loading = "pending"), (state.error = null);
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      isString(action.payload) && (state.error = action.payload as string);
    });
  },
});
export { actGetCategories };
export const { categoriesRecordsCleanUp } = categoriesSlice.actions;
export default categoriesSlice.reducer;
