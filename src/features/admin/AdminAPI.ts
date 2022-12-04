import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../core/HttpClient";
import { AddCategoryAPIBody } from "./AdminModels";

export const addCategory = createAsyncThunk<any, AddCategoryAPIBody>(
  "auth/login",
  async (data: AddCategoryAPIBody) => {
    const response = await httpClient.post("/categories", data);
    return response.data;
  }
);
