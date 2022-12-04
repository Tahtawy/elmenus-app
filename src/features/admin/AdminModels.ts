export interface AddCategoryAPIBody {
  name: string;
  description: string;
}

export type AddCategoryItemFormValues = {
  name: string;
  price: number | string;
  description: string;
};

export type AddCategoryItemAPIBody = AddCategoryItemFormValues & {
  categoryId: string;
};

export interface AdminInitialState {
  loading: boolean;
}
