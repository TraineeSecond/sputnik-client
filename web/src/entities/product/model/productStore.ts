import { api } from 'shared';
import { create } from 'zustand';

import { Product, ProductState, ProductsResponse } from './types';

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  product: null,
  loadProducts: async (): Promise<void> => {
    try {
      const res = await api.get<ProductsResponse>('products');
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
