import {
  createSlice,
  isPending,
  isRejectedWithValue,
  isFulfilled,
} from "@reduxjs/toolkit";
import {
  addCategory,
  addCategoryItem,
  deleteCategory,
  deleteCategoryItem,
} from "./AdminAPI";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    modalData: {
      isOpen: false,
      type: "category",
      action: "delete",
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
          addCategoryItem,
          deleteCategory,
          deleteCategoryItem
        ),
        (state, _) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isRejectedWithValue(
          addCategory,
          addCategoryItem,
          deleteCategory,
          deleteCategoryItem
        ),
        (state, _) => {
          state.loading = false;
        }
      )
      .addMatcher(
        isFulfilled(
          addCategory,
          addCategoryItem,
          deleteCategory,
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
