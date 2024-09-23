import { User } from 'entities/user/model/types';

export interface ProductState {
  products: Product[];
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
