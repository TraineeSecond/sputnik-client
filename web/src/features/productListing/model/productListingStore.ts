import api from 'shared/api/api';
import { create } from 'zustand';

import {
  ICreateProductResponse,
  IListingProduct,
  IProductListingState,
} from './types';

export const useProductListingStore = create<IProductListingState>((set) => ({
  loading: false,
  error: null,

  createProduct: async (product: IListingProduct) => {
    set({ loading: true, error: null });

    try {
      await api.post<ICreateProductResponse>('/product', product);
      set({ loading: false });
    } catch (error) {
      console.error(error);
      set({ error: 'Ошибка при создании товара', loading: false });
    }
  },
}));
