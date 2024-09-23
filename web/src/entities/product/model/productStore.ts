import { ProductState } from './types';
import axios from 'axios';
import { create } from 'zustand';

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loadProducts: async () => {
    try {
      const products = await axios
        .get('https://domennameabcdef.ru/api/products')
        .then((res) => res.data);
      set({ products });
    } catch (error) {
      console.log('ошибка получения продуктов');
    }
  },
}));
