import { RcFile } from 'antd/es/upload';
import { api } from 'shared';
import { create } from 'zustand';

import {
  IProduct,
  IProductImage,
  IProductState,
  TDeleteProductResponse,
  TFiltersResponse,
  TProductsResponse,
} from './types';

export const useProductStore = create<IProductState>((set, get) => ({
  page: 1,
  pageSize: 11,
  sortName: '',
  sortCategory: '',
  products: [],
  product: null,
  categories: [],
  loadingProduct: false,
  error: null,
  sellerId: null,
  changeImagesProcess: false,

  loadCategories: async (): Promise<void> => {
    try {
      const { data } = await api.get<TFiltersResponse>('categories');
      set({ categories: data });
    } catch (error) {
      console.error(error);
      set({ error: 'Ошибка при загрузке категорий' });
    }
  },

  setSellerId: async (id: number | null) => {
    set({ sellerId: id });
    set({ products: [] });
    get().rezeroProductPage();
    await get().loadProducts();
  },

  setSortCategory: async (category) => {
    set({ sortCategory: category });
    set({ products: [] });
    get().rezeroProductPage();
    await get().loadProducts();
  },

  setSortName: async (name: string): Promise<void> => {
    set({ sortName: name });
    set({ products: [] });
    get().rezeroProductPage();
    await get().loadProducts();
  },

  rezeroProductPage: (): void => {
    set({ page: 1 });
    set({ products: [] });
  },

  loadNextProductPage: async (): Promise<void> => {
    set({ page: get().page + 1 });
    await get().loadProducts();
  },

  loadProducts: async (): Promise<void> => {
    try {
      const { sortName, sortCategory, sellerId, page, pageSize } = get();
      const res = await api.get<TProductsResponse>('products', {
        params: {
          name: sortName,
          category: sortCategory,
          userid: sellerId,
          ...(sellerId === null && { page, pageSize }),
        },
      });
      const { data } = res;
      set({ products: [...get().products, ...data] });
    } catch (error) {
      console.error(error);
      set({ error: 'Ошибка при загрузке продуктов' });
    }
  },

  loadProductById: async (productId: number): Promise<void> => {
    try {
      set({ loadingProduct: true, error: null });
      const res = await api.get<IProduct>('/product', {
        params: { id: productId },
      });
      const { data } = res;
      set({ product: data, loadingProduct: false });
    } catch (error) {
      console.error(error);
      set({ error: 'Ошибка при загрузке продукта', loadingProduct: false });
    }
  },

  addImageToProduct: async (productId: number, image: RcFile) => {
    set({ changeImagesProcess: true });
    const formData = new FormData();
    formData.append('image', image);
    try {
      await api.post<Omit<IProductImage, 'productid'>>(
        '/productimage/' + productId,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
    } catch (error) {
      console.error(error);
      set({ error: 'Ошибка при загрузке изображения' });
    }
    set({ changeImagesProcess: false });
  },

  deleteProductImage: async (image: IProductImage) => {
    set({ changeImagesProcess: true });
    try {
      await api.delete<string>('/productimage/' + image.id);
    } catch (error) {
      console.error(error);
      set({ error: 'Ошибка при удалении изображения' });
    }
    set({ changeImagesProcess: false });
  },

  deleteProduct: async (id: number) => {
    try {
      await api.delete<TDeleteProductResponse>('/product/' + id);
    } catch (error) {
      console.error(error);
      set({ error: 'Ошибка при удалении продукта' });
    }
  },
}));
