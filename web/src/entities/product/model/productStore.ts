import { RcFile } from 'antd/es/upload';
import { api } from 'shared';
import { create } from 'zustand';

import {
  FiltersResponse,
  Product,
  ProductImage,
  ProductState,
  ProductsResponse,
} from './types';

export const useProductStore = create<ProductState>((set, get) => ({
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
      const { data } = await api.get<FiltersResponse>('categories');
      set({ categories: data });
    } catch (error) {
      console.error(error);
      set({ error: 'Ошибка при загрузке категорий' });
    }
  },

  setSellerId: async (id: number | null) => {
    set({ sellerId: id });
    set({ products: [] });
    await get().loadProducts();
  },

  setSortCategory: async (category) => {
    set({ sortCategory: category });
    set({ products: [] });
    await get().loadProducts();
  },

  setSortName: async (name: string): Promise<void> => {
    set({ sortName: name });
    set({ products: [] });
    await get().loadProducts();
  },

  loadProducts: async (): Promise<void> => {
    try {
      const { sortName, sortCategory, sellerId } = get();
      const res = await api.get<ProductsResponse>('products', {
        params: {
          name: sortName,
          category: sortCategory,
          userid: sellerId,
        },
      });
      const { data } = res;
      set({ products: data });
    } catch (error) {
      console.error(error);
      set({ error: 'Ошибка при загрузке продуктов' });
    }
  },

  loadProductById: async (productId: number): Promise<void> => {
    try {
      set({ loadingProduct: true, error: null });
      const res = await api.get<Product>('/product', {
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
      await api.post<Omit<ProductImage, 'productid'>>(
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

  deleteProductImage: async (image: ProductImage) => {
    set({ changeImagesProcess: true });
    try {
      await api.delete<string>('/productimage/' + image.id);
    } catch (error) {
      console.error(error);
      set({ error: 'Ошибка при удалении изображения' });
    }
    set({ changeImagesProcess: false });
  },
}));
