import api from 'shared/api/api';
import { create } from 'zustand';

import {
  CreateProductResponse,
  ListingProduct,
  ProductListingState,
} from './types';

export const useProductListingStore = create<ProductListingState>((set) => ({
  loading: false,
  error: null,

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
