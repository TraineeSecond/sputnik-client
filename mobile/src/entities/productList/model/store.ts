import {create} from 'zustand';
import axios from 'axios';
import {Category, CategoryResponse, Product, ProductsResponse} from 'entities';

type ProductListStore = {
  productList: Product[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => void;
  fetchCategories: () => void;
  clearStore: () => void;
};

export const useProductListStore = create<ProductListStore>(set => ({
  productList: [],
  categories: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({isLoading: true, error: null});
    try {
      const res = await axios.get<ProductsResponse>(
        'https://domennameabcdef.ru/api/products',
      );
      const {data} = res;
      set({productList: data, isLoading: false});
    } catch (error) {
      set({error: 'Ошибка при загрузке товаров', isLoading: false});
    }
  },

  fetchCategories: async () => {
    set({isLoading: true, error: null});
    try {
      const {data} = await axios.get<CategoryResponse>(
        'https://domennameabcdef.ru/api/categories',
      );
      set({categories: data, isLoading: false});
    } catch (error) {
      set({error: 'Ошибка при загрузке категорий', isLoading: false});
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
