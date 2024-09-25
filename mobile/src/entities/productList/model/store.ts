import {create} from 'zustand';
import axios from 'axios';
import {Category, CategoryResponse, Product, ProductsResponse} from 'entities';

type ProductListStore = {
  productList: Product[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  setIsLoading: (value: boolean) => void;
  fetchProducts: () => void;
  fetchCategories: () => void;
  clearStore: () => void;
};

export const useProductListStore = create<ProductListStore>(set => ({
  productList: [],
  categories: [],
  isLoading: false,
  error: null,

  setIsLoading: (value: boolean) => set({isLoading: value}),

  fetchProducts: async () => {
    set({error: null});
    try {
      const res = await axios.get<ProductsResponse>(
        'https://domennameabcdef.ru/api/products',
      );
      const {data} = res;
      set({productList: data});
    } catch (error) {
      set({
        error: 'Ошибка при загрузке товаров. Попробуйте перезагрузить страницу',
      });
    }
  },

  fetchCategories: async () => {
    set({error: null});
    try {
      const {data} = await axios.get<CategoryResponse>(
        'https://domennameabcdef.ru/api/categories',
      );
      set({categories: data});
    } catch (error) {
      set({
        error:
          'Ошибка при загрузке категорий. Попробуйте перезагрузить страницу',
      });
    }
  },

  clearStore: () => {
    set({
      productList: [],
      categories: [],
      error: null,
    });
  },
}));
