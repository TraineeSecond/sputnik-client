import {create} from 'zustand';
import axios from 'axios';
import {Category, CategoryResponse, Product, ProductsResponse} from 'entities';

type ProductListStore = {
  productList: Product[];
  categories: Category[];
  isLoading: boolean;
  error: boolean;
  setIsLoading: (value: boolean) => void;
  fetchProducts: () => void;
  fetchCategories: () => void;
  clearStore: () => void;
};

export const useProductListStore = create<ProductListStore>(set => ({
  productList: [],
  categories: [],
  isLoading: false,
  error: false,

  setIsLoading: (value: boolean) => set({isLoading: value}),

  fetchProducts: async () => {
    set({error: false});
    try {
      const res = await axios.get<ProductsResponse>(
        'https://domennameabcdef.ru/api/products',
      );
      const {data} = res;
      set({productList: data});
    } catch (error) {
      set({error: true});
    }
  },

  fetchCategories: async () => {
    set({error: false});
    try {
      const {data} = await axios.get<CategoryResponse>(
        'https://domennameabcdef.ru/api/categories',
      );
      set({categories: data});
    } catch (error) {
      set({error: true});
    }
  },

  clearStore: () => {
    set({
      productList: [],
      categories: [],
      error: true,
    });
  },
}));
