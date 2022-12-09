import {
  createSlice,
  isPending,
  isRejectedWithValue,
  isFulfilled,
} from "@reduxjs/toolkit";
import {
  addCategoryAPI,
  editCategoryAPI,
  deleteCategoryAPI,
  addCategoryItemAPI,
  editCategoryItemAPI,
  deleteCategoryItemAPI,
} from "./AdminAPI";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    modalData: {
      type: "none",
      action: "add",
      data: {
        formData: { name: "", description: "" },
      },
    },
  },
  reducers: {
    setModalData: (state, action) => {
      state.modalData = {
        ...state.modalData,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending(
          addCategoryAPI,
          editCategoryAPI,
          deleteCategoryAPI,
          addCategoryItemAPI,
          editCategoryItemAPI,
          deleteCategoryItemAPI
        ),
        (state, _) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isRejectedWithValue(
          addCategoryAPI,
          editCategoryAPI,
          deleteCategoryAPI,
          addCategoryItemAPI,
          editCategoryItemAPI,
          deleteCategoryItemAPI
        ),
        (state, _) => {
          state.loading = false;
        }
      )
      .addMatcher(
        isFulfilled(
          addCategoryAPI,
          editCategoryAPI,
          deleteCategoryAPI,
          addCategoryItemAPI,
          editCategoryItemAPI,
          deleteCategoryItemAPI
        ),
        (state, _) => {
          state.loading = false;
        }
      );
  },
});

export const { setModalData } = adminSlice.actions;

export default adminSlice.reducer;
