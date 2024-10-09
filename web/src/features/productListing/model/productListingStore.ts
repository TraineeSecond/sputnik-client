import api from 'shared/api/api';
import { create } from 'zustand';

import {
  CreateProductResponse,
  ListingProduct,
  ProductListingState,
} from './types';

export const useProductListingStore = create<ProductListingState>((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });

    try {
      const response = await api.get<string[]>('/categories');
      set({ categories: response.data, loading: false });
    } catch (error) {
      console.error(error);
      set({ error: 'Ошибка при получении категорий', loading: false });
    }
  },

  createProduct: async (product: ListingProduct) => {
    set({ loading: true, error: null });

    try {
      await api.post<CreateProductResponse>('/product', product);
      set({ loading: false });
    } catch (error) {
      console.error(error);
      set({ error: 'Ошибка при создании товара', loading: false });
    }
  },
}));
