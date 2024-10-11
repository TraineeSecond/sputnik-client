export interface ListingProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  userId: number;
}

export interface ProductListingState {
  loading: boolean;
  error: string | null;
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
