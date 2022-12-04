import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../core/HttpClient";

export const listCategory = createAsyncThunk(
  "shared/listCategory",
  async () => {
    const response = await httpClient.get("/categories");
    return response.data;
  }
);

export const listCategoryItems = createAsyncThunk<any, any>(
  "shared/listCategoryItems",
  async (categoryId) => {
    const response = await httpClient.get(`/categories/${categoryId}/items`);
    return response.data;
  }
);
