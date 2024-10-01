import { User } from 'shared/auth/model/types';

export interface ProductState {
  products: Product[];
  product: Product | null;
  loadProductById: (productId: number) => Promise<void>;
  loadProducts: () => Promise<void>;
}

export interface Product {
  id: number;
  description: string;
  category: string;
  price: number;
  new_price: number;
  name: string;
  userid: number;
  user: User;
}

export type ProductsResponse = Product[];
