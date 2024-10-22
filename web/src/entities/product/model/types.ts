import { RcFile } from 'antd/es/upload';

import { IUser } from 'shared/auth/model/types';

export type TFiltersResponse = string[];

export interface IProductState {
  products: IProduct[];
  product: IProduct | null;
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
  deleteProductImage: (image: IProductImage) => Promise<void>;
  loadingProduct: boolean;
  changeImagesProcess: boolean;
  error: string | null;
}

export interface IProductImage {
  id: number;
  image: string;
  productid: number;
}

export interface IProduct {
  id: number;
  description: string;
  category: string;
  price: number;
  new_price: number;
  name: string;
  userid: number;
  rating: number;
  reviewerscount: number;
  user: IUser;
  images: IProductImage[];
}

export type TProductsResponse = IProduct[];
