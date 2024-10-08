import axios from 'axios';
import {Category, Product} from 'entities';
import {create} from 'zustand';

type ProductsResponse = Product[];

type CategoryResponse = Category[];

type SearchStore = {
  category: string;
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
  fetchStartData: () => Promise<void>;
};

export const useSearchCatalogStore = create<SearchStore>((set, get) => ({
  category: '',
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
      const newCategory = state.category === category ? '' : category;
      if (!newCategory) {
        return {
          category: '',
          foundProducts: state.allProductList,
        };
      }
      return {category: newCategory};
    });
  },

  setSearchText: text => set({searchText: text}),

  fetchProducts: async () => {
    const {category, searchText} = get();
    set({isLoading: true});
    try {
      const {data} = await axios.get<ProductsResponse>(
        'https://domennameabcdef.ru/api/products',
        {
          params: {
            category: category,
            ...(category && {name: category}),
            ...(searchText && {name: searchText}),
          },
        },
      );
      set({foundProducts: data});
    } catch (error) {
      set({error: true});
    } finally {
      set({isLoading: false});
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

  fetchStartData: async () => {
    set({error: false, isLoading: true});
    try {
      const res = await axios.get<ProductsResponse>(
        'https://domennameabcdef.ru/api/products',
      );
      const {data} = res;

      get().fetchCategories();
      set({
        allProductList: data,
        foundProducts: data,
      });
    } catch (error) {
      set({error: true});
    } finally {
      set({isLoading: false});
    }
  },
}));
