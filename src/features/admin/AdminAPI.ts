import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "../shared/SharedModels";
import { httpClient } from "../core/httpClient";
import {
  AddCategoryAPIBody,
  AddCategoryItemAPIBody,
  AdminDeleteCategoryParams,
  AdminEditCategoryAPIParams,
  AdminDeleteCategoryItemParams,
  AdminEditCategoryItemAPIParams,
} from "./AdminModels";

export const addCategoryAPI = createAsyncThunk<Category, AddCategoryAPIBody>(
  "admin/addCategoryAPI",
  async (data: AddCategoryAPIBody) => {
    const response = await httpClient.post("/categories", data);
    return response.data;
  }
);

export const addCategoryItemAPI = createAsyncThunk<any, AddCategoryItemAPIBody>(
  "admin/addCategoryItemAPI",
  async (data: AddCategoryItemAPIBody) => {
    const response = await httpClient.post("/items", data);
    return response.data;
  }
);

export const deleteCategoryAPI = createAsyncThunk<
  any,
  AdminDeleteCategoryParams
>("admin/deleteCategoryAPI", async (categoryId) => {
  const response = await httpClient.delete(`/categories/${categoryId}`);
  return response.data;
});

export const deleteCategoryItemAPI = createAsyncThunk<
  any,
  AdminDeleteCategoryItemParams
>("admin/deleteCategoryItemAPI", async (ids) => {
  const response = await httpClient.delete(
    `/categories/${ids.categoryId}/items/${ids.itemId}`
  );
  return response.data;
});

export const editCategoryAPI = createAsyncThunk<
  any,
  AdminEditCategoryAPIParams
>("admin/editCategoryAPI", async (params: AdminEditCategoryAPIParams) => {
  const response = await httpClient.patch(
    `/categories/${params.categoryId}`,
    params.data
  );
  return response.data;
});

export const editCategoryItemAPI = createAsyncThunk<
  any,
  AdminEditCategoryItemAPIParams
>(
  "admin/editCategoryItemAPI",
  async (params: AdminEditCategoryItemAPIParams) => {
    const response = await httpClient.patch(
      `/categories/${params.categoryId}/items/${params.itemId}`,
      params.data
    );
    return response.data;
  }
);
