import { createSlice } from "@reduxjs/toolkit";
import { AuthInitialState } from "./AuthModels";
import { login } from "./AuthAPI";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isLoggedin: false,
    permissions: [],
  },
  reducers: {
    setAuthStatus: (state, action) => {
      state.isLoggedin = action.payload;
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
  },
  extraReducers: {
    [login.pending as any]: (state: AuthInitialState) => {
      state.loading = true;
    },
    [login.fulfilled as any]: (state: AuthInitialState, { payload }) => {
      state.loading = false;
      state.isLoggedin = true;
      state.permissions = payload.permissions;
    },
    [login.rejected as any]: (state) => {
      state.loading = false;
    },
  },
});

export const { setAuthStatus, setPermissions } = authSlice.actions;

export default authSlice.reducer;
