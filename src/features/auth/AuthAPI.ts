import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../core/httpClient";
import { LoginAPIBody, LoginAPIResponse } from "./AuthModels";

export const login = createAsyncThunk<LoginAPIResponse, LoginAPIBody>(
  "auth/login",
  async (data: LoginAPIBody) => {
    const response = await httpClient.post("/login", data);
    return response.data;
  }
);
