import axios from 'axios';
import {Product, ProductsResponse} from 'entities';
import {create} from 'zustand';

type ProductListStore = {
  allProductList: Product[];
  isLoading: boolean;
  error: boolean;
  setIsLoading: (value: boolean) => void;
  fetchAllProducts: () => void;
};

export const useProductListStore = create<ProductListStore>(set => ({
  allProductList: [],
  isLoading: false,
  error: false,

  setIsLoading: (value: boolean) => set({isLoading: value}),

  fetchAllProducts: async () => {
    set({error: false});
    try {
      const res = await axios.get<ProductsResponse>(
        'https://domennameabcdef.ru/api/products',
      );
      const {data} = res;
      set({allProductList: data});
    } catch (error) {
      set({error: true});
    }
  },
}));
