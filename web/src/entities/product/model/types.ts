import { RcFile } from 'antd/es/upload';

import { User } from 'shared/auth/model/types';

export type FiltersResponse = string[];

export interface ProductState {
  products: Product[];
  product: Product | null;
  sortName: string;
  sortCategory: string;
  sellerId: number | null;
  categories: string[];
  loadCategories: () => Promise<void>;
  setSortName: (name: string) => Promise<void>;
  setSortCategory: (category: string) => Promise<void>;
  loadProductById: (productId: number) => Promise<void>;
  loadProducts: () => Promise<void>;
  setSellerId: (id: number | null) => Promise<void>;
  addImageToProduct: (productId: number, image: RcFile) => Promise<void>;
  deleteProductImage: (image: ProductImage) => Promise<void>;
  loadingProduct: boolean;
  changeImagesProcess: boolean;
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
  rating: number;
  reviewerscount: number;
  user: User;
  images: ProductImage[];
}

export type ProductsResponse = Product[];
