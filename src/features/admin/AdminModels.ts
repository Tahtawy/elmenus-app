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

export type ModalData = {
  isOpen: boolean;
  type: "category" | "item";
  action: "delete" | "edit";
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
