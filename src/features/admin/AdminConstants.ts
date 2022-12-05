import { AddCategoryAPIBody, CategoryItemFormValues } from "./AdminModels";

export const initialAddCategory: AddCategoryAPIBody = {
  name: "",
  description: "",
};

export const initialAddItem: CategoryItemFormValues = {
  name: "",
  price: "",
  description: "",
};
