import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../shared/SharedModels";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    selectedCategory: "",
    filtredCategory: {} as Category,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setFiltredCategory: (state, action) => {
      const { categories, selectedCategory } = action.payload;

      state.filtredCategory = categories.find(
        (category: Category) => category.name === selectedCategory
      );
    },
  },
});

export const { setSelectedCategory, setFiltredCategory } = menuSlice.actions;

export default menuSlice.reducer;
