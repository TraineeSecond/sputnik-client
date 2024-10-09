import { api } from 'shared';
import { create } from 'zustand';

import {
  FiltersResponse,
  Product,
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

  loadCategories: async (): Promise<void> => {
    try {
      const { data } = await api.get<FiltersResponse>('categories');
      set({ categories: data });
    } catch (error) {
      console.error(error);
      set({ error: 'Ошибка при загрузке категорий' });
    }
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
      let url = 'products';
      const { sortName, sortCategory } = get();
      if (sortName.length > 0 && sortCategory.length > 0) {
        url += `?name=${sortName}&category=${sortCategory}`;
      } else if (sortName.length > 0) {
        url += `?name=${sortName}`;
      } else if (sortCategory.length > 0) {
        url += `?category=${sortCategory}`;
      }
      const res = await api.get<ProductsResponse>(url);
      const { data } = res;
      set({ products: data });
    } catch (error) {
      console.error(error);
      set({ error: 'Ошибка при загрузке продуктов' }); // Добавлено состояние ошибки
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
}));
