import axios from 'axios';
import {Category} from 'entities/index';
import {Product} from 'entities/product';
import {create} from 'zustand';

// ProductsResponse;

// CategoryResponse;

// CategoryResponse;

type SearchStore = {
  currentCategory: string;
  searchText: string;
  foundProducts: Product[];
  categories: Category[];
  isLoading: boolean;
  error: boolean;
  allProductList: Product[];
  setIsLoading: (value: boolean) => void;
  setCategory: (category: string) => void;
  setSearchText: (text: string) => void;
  setFoundProducts: (products: Product[]) => void;
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchAllProducts: () => Promise<void>;
};

export const useSearchCatalogStore = create<SearchStore>((set, get) => ({
  currentCategory: '',
  searchText: '',
  foundProducts: [],
  isLoading: false,
  error: false,
  categories: [],
  allProductList: [],

  setIsLoading: (value: boolean) => set({isLoading: value}),

  setFoundProducts: (foundProducts: Product[]) => set({foundProducts}),

  setCategory: (category: string) => {
    set(state => {
      const newCategory = state.currentCategory === category ? '' : category;

      if (!newCategory) {
        return {currentCategory: '', foundProducts: get().allProductList};
      }

      set({currentCategory: newCategory});

      return {currentCategory: newCategory};
    });
  },

  setSearchText: text => set({searchText: text}),

  fetchProducts: async () => {
    const {currentCategory, searchText} = get();
    try {
      const {data} = await axios.get(
        'https://domennameabcdef.ru/api/products',
        {
          params: {
            categorie: currentCategory,
            ...(searchText && {name: searchText}),
          },
        },
      );
      console.log(data);
      set({foundProducts: data});
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error);
    }
  },

  fetchCategories: async () => {
    set({error: false});
    try {
      const {data} = await axios.get(
        'https://domennameabcdef.ru/api/categories',
      );
      set({categories: data});
    } catch (error) {
      set({error: true});
    }
  },

  fetchAllProducts: async () => {
    set({error: false});
    try {
      const res = await axios.get('https://domennameabcdef.ru/api/products');
      const {data} = res;
      set({allProductList: data});
    } catch (error) {
      set({error: true});
    }
  },
}));
