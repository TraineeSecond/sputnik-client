import { ProductsResponse, ProductState } from './types';
import { api } from 'shared';
import { create } from 'zustand';

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loadProducts: async () => {
    try {
      const res = await api.get<ProductsResponse>("products")
      const { data } = res
      set({ products: data });
    } catch (error) {
      //TODO: заменить alert на кастомный popup
      alert("во время загрузки продуктов произошла ошибка")
    }
  },
}));
