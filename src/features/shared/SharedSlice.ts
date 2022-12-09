import { createSlice } from "@reduxjs/toolkit";
import { SharedInitialState } from "./SharedModels";
import { listCategory } from "./SharedAPI";

export const sharedSlice = createSlice({
  name: "shared",
  initialState: {
    loading: false,
    categories: [],
  },
  reducers: {
    addCategory: (state: SharedInitialState, action) => {
      state.categories.unshift(action.payload);
    },
    editCategories: (state: SharedInitialState, action) => {
      const { index, data } = action.payload;
      const categoriesCopy = [...state.categories];
      categoriesCopy[index] = {
        ...categoriesCopy[index],
        ...data,
      };
      state.categories = categoriesCopy;
    },
    deleteCategories: (state: SharedInitialState, action) => {
      const { index } = action.payload;
      const categoriesCopy = [...state.categories];
      categoriesCopy.splice(index, 1);
      state.categories = categoriesCopy;
    },
    addCategoryItem: (state: SharedInitialState, action) => {
      const { parentIndex: categoryIndex, data } = action.payload;
      const categoriesCopy = [...state.categories];
      state.categories[categoryIndex].items.unshift(data);
      state.categories = categoriesCopy;
    },
    editCategoryItem: (state: SharedInitialState, action) => {
      const {
        index: itemIndex,
        parentIndex: categoryIndex,
        data,
      } = action.payload;
      const categoriesCopy = [...state.categories];
      const itemToedit = categoriesCopy[categoryIndex].items[itemIndex];
      categoriesCopy[categoryIndex].items[itemIndex] = {
        ...itemToedit,
        ...data,
      };
      state.categories = categoriesCopy;
    },
    deleteCategoryItem: (state: SharedInitialState, action) => {
      const { index: itemIndex, parentIndex: categoryIndex } = action.payload;
      const categoriesCopy = [...state.categories];
      categoriesCopy[categoryIndex].items.splice(itemIndex, 1);
      state.categories = categoriesCopy;
    },
  },
  extraReducers: {
    [listCategory.pending as any]: (state: SharedInitialState) => {
      state.loading = true;
    },
    [listCategory.fulfilled as any]: (
      state: SharedInitialState,
      { payload }
    ) => {
      state.loading = false;
      state.categories = payload;
    },
    [listCategory.rejected as any]: (state) => {
      state.loading = false;
    },
  },
});

export const {
  addCategory,
  editCategories,
  deleteCategories,
  addCategoryItem,
  editCategoryItem,
  deleteCategoryItem,
} = sharedSlice.actions;

export default sharedSlice.reducer;
