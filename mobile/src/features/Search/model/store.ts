import axios from 'axios';
import {Category, CategoryResponse} from 'entities/index';
import {Product} from 'entities/product';
import {create} from 'zustand';

type SearchStore = {
  currentCategory: string;
  searchText: string;
  foundProducts: any[];
  categories: Category[];
  isLoading: boolean;
  error: boolean;
  setIsLoading: (value: boolean) => void;
  setCategory: (category: string) => void;
  setSearchText: (text: string) => void;
  setFoundProducts: (products: Product[]) => void;
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
};

export const useSearchStore = create<SearchStore>((set, get) => ({
  currentCategory: '',
  searchText: '',
  foundProducts: [],
  isLoading: false,
  error: false,
  categories: [],

  setIsLoading: (value: boolean) => set({isLoading: value}),

  setFoundProducts: (foundProducts: Product[]) => set({foundProducts}),

  setCategory: currentCategory => set({currentCategory}),

  setSearchText: text => set({searchText: text}),

  fetchProducts: async () => {
    const {currentCategory, searchText} = get();
    try {
      const response = await fetch(
        `https://domennameabcdef.ru/api/products?categorie=${currentCategory}&name=${searchText}`,
      );
      const data = await response.json();
      set({foundProducts: data});
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error);
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
}));
