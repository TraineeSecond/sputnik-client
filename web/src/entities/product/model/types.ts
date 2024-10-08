import { User } from 'shared/auth/model/types';

export type FiltersResponse = string[];

export interface ProductState {
  products: Product[];
  product: Product | null;
  sortName: string;
  sortCategory: string;
  categories: string[];
  loadCategories: () => Promise<void>;
  setSortName: (name: string) => Promise<void>;
  setSortCategory: (category: string) => Promise<void>;
  loadProductById: (productId: number) => Promise<void>;
  loadProducts: () => Promise<void>;
  loadingProduct: boolean;
  error: string | null;
}

export interface ProductImage {
  id: number;
  image: string;
  productid: number;
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
  images: ProductImage[];
  rating: number;
  reviewerscount: number;
}

export type ProductsResponse = Product[];
