import {
  createSlice,
  isPending,
  isRejectedWithValue,
  isFulfilled,
} from "@reduxjs/toolkit";
import {
  addCategory,
  editCategory,
  deleteCategory,
  addCategoryItem,
  editCategoryItem,
  deleteCategoryItem,
} from "./AdminAPI";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    modalData: {
      type: "none",
      action: "close",
      data: {},
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
          addCategory,
          editCategory,
          deleteCategory,
          addCategoryItem,
          editCategoryItem,
          deleteCategoryItem
        ),
        (state, _) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isRejectedWithValue(
          addCategory,
          editCategory,
          deleteCategory,
          addCategoryItem,
          editCategoryItem,
          deleteCategoryItem
        ),
        (state, _) => {
          state.loading = false;
        }
      )
      .addMatcher(
        isFulfilled(
          addCategory,
          editCategory,
          deleteCategory,
          addCategoryItem,
          editCategoryItem,
          deleteCategoryItem
        ),
        (state, _) => {
          state.loading = false;
        }
      );
  },
});

export const { setModalData } = adminSlice.actions;

export default adminSlice.reducer;
