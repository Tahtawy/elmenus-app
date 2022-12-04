import { createSlice } from "@reduxjs/toolkit";
import { AdminInitialState } from "./AdminModels";
import { addCategory } from "./AdminAPI";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [addCategory.pending as any]: (state: AdminInitialState) => {
      state.loading = true;
    },
    [addCategory.fulfilled as any]: (state: AdminInitialState, { payload }) => {
      state.loading = false;
    },
    [addCategory.rejected as any]: (state) => {
      state.loading = false;
    },
  },
});

export default adminSlice.reducer;
