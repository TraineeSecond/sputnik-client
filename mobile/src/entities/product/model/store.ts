import {create} from 'zustand';
import axios from 'axios';
import {Product} from 'entities/product';

type ProductStore = {
  currentProduct: Product | null;
  isLoading: boolean;
  error: boolean;
  fetchProduct: (id: number) => Promise<void>;
  setProduct: (product: Product) => void;
};

export const useProductStore = create<ProductStore>(set => ({
  currentProduct: null,
  isLoading: false,
  error: false,

  fetchProduct: async (id: number) => {
    set({isLoading: true, error: false});
    try {
      const response = await axios.get<Product>(
        `https://domennameabcdef.ru/api/product?id=${id}`,
      );
      set({currentProduct: response.data, isLoading: false});
    } catch (error) {
      set({
        error: false,
        isLoading: false,
      });
    }
  },

  setProduct: (currentProduct: Product) => {
    set({currentProduct});
  },
}));
