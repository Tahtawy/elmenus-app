import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../core/HttpClient";
import { AddCategoryAPIBody, AddCategoryItemAPIBody } from "./AdminModels";

export const addCategory = createAsyncThunk<any, AddCategoryAPIBody>(
  "admin/addCategory",
  async (data: AddCategoryAPIBody) => {
    const response = await httpClient.post("/categories", data);
    return response.data;
  }
);

export const addCategoryItem = createAsyncThunk<any, AddCategoryItemAPIBody>(
  "admin/addCategoryItem",
  async (data: AddCategoryItemAPIBody) => {
    const response = await httpClient.post("/items", data);
    return response.data;
  }
);
