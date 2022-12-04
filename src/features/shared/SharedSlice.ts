import { createSlice } from "@reduxjs/toolkit";
import { SharedInitialState, Category } from "./SharedModels";
import { listCategory } from "./SharedAPI";

export const sharedSlice = createSlice({
  name: "shared",
  initialState: {
    loading: false,
    categories: [],
  },
  reducers: {},
  extraReducers: {
    [listCategory.pending as any]: (state: SharedInitialState) => {
      state.loading = true;
    },
    [listCategory.fulfilled as any]: (
      state: SharedInitialState,
      { payload }
    ) => {
      state.loading = false;
      state.categories = payload;
    },
    [listCategory.rejected as any]: (state) => {
      state.loading = false;
    },
  },
});

export default sharedSlice.reducer;
