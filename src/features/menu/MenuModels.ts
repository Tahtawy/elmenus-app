import { Category } from "../shared/SharedModels";

export interface AdminInitialState {
  selectedCategory: string;
  filtredCategory: Category;
}

export interface CategorySelectItem {
  name: string;
  id: string;
}
