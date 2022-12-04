export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  items: Item[];
}

export interface CategoryListAPIResponse {
  categories: Category[];
}

export interface SharedInitialState {
  loading: boolean;
  categories: Category[];
}
