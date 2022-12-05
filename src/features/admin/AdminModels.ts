export interface AddCategoryAPIBody {
  name: string;
  description: string;
}

export type CategoryItemFormValues = {
  name: string;
  price: number | string;
  description: string;
};

export type AddCategoryItemAPIBody = CategoryItemFormValues & {
  categoryId: string;
};

export type ModalData = {
  type: "category" | "item";
  action: "delete" | "edit" | "close";
  data?: any;
};

export interface AdminInitialState {
  loading: boolean;
  modalData: ModalData;
}

export interface AdminDeleteCategoryParams {
  categoryId: string;
}

export interface AdminDeleteCategoryItemParams {
  categoryId: string;
  itemId: string;
}

export interface AdminEditCategoryAPIParams {
  categoryId: string;
  data: AddCategoryAPIBody;
}

export interface AdminEditCategoryItemAPIParams {
  categoryId: string;
  itemId: string;
  data: CategoryItemFormValues;
}
