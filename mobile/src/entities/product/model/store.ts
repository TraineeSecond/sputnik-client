import axios from 'axios';
import {Product} from 'entities/product';
import {create} from 'zustand';

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
      const productResponse = await axios.get<Product>(
        `https://domennameabcdef.ru/api/product?id=${id}`,
      );

      set({
        currentProduct: {
          ...productResponse.data,
        },
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching product or reviews:", error);
      set({
        error: true,
        isLoading: false,
      });
    }
},

  setProduct: (currentProduct: Product) => {
    set({currentProduct});
  },
}));
