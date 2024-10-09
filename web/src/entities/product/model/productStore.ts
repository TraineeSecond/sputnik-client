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
  loadCategories: async (): Promise<void> => {
    const res = await api.get<FiltersResponse>('categories');
    const { data } = res;
    set({ categories: data });
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
      //TODO: заменить alert на кастомный popup
      alert('во время загрузки продуктов произошла ошибка');
    }
  },

  loadProductById: async (productId: number): Promise<void> => {
    try {
      const res = await api.get<Product>(`/product`, {
        params: { id: productId },
      });
      const { data } = res;
      set({ product: data });
    } catch (error) {
      console.error(error);
      alert('Во время загрузки продукта произошла ошибка');
    }
  },
}));
