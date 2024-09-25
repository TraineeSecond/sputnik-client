export interface ListingProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  userId: number;
}

export interface ProductListingState {
  categories: string[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  createProduct: (product: ListingProduct) => Promise<void>;
}

export interface CreateProductResponse {
  id: number;
  description: string;
  category: string;
  price: number;
  new_price: number;
  name: string;
  userId: number;
}
