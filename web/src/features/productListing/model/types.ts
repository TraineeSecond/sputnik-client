export interface IListingProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  userId: number;
}

export interface IProductListingState {
  loading: boolean;
  error: string | null;
  createProduct: (product: IListingProduct) => Promise<void>;
}

export interface ICreateProductResponse {
  id: number;
  description: string;
  category: string;
  price: number;
  new_price: number;
  name: string;
  userId: number;
}
