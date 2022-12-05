import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../core/httpClient";
import {
  AddCategoryAPIBody,
  AddCategoryItemAPIBody,
  AdminDeleteCategoryParams,
  AdminEditCategoryAPIParams,
  AdminDeleteCategoryItemParams,
  AdminEditCategoryItemAPIParams,
} from "./AdminModels";

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

export const deleteCategory = createAsyncThunk<any, AdminDeleteCategoryParams>(
  "admin/deleteCategory",
  async (categoryId) => {
    const response = await httpClient.delete(`/categories/${categoryId}`);
    return response.data;
  }
);

export const deleteCategoryItem = createAsyncThunk<
  any,
  AdminDeleteCategoryItemParams
>("admin/deleteCategoryItem", async (ids) => {
  const response = await httpClient.delete(
    `/categories/${ids.categoryId}/items/${ids.itemId}`
  );
  return response.data;
});

export const editCategory = createAsyncThunk<any, AdminEditCategoryAPIParams>(
  "admin/editCategory",
  async (params: AdminEditCategoryAPIParams) => {
    const response = await httpClient.patch(
      `/categories/${params.categoryId}`,
      params.data
    );
    return response.data;
  }
);

export const editCategoryItem = createAsyncThunk<
  any,
  AdminEditCategoryItemAPIParams
>("admin/editCategoryItem", async (params: AdminEditCategoryItemAPIParams) => {
  const response = await httpClient.patch(
    `/categories/${params.categoryId}/items/${params.itemId}`,
    params.data
  );
  return response.data;
});
