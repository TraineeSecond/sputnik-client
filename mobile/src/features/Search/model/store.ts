import axios from 'axios';
import {
  Category,
  CategoryResponse,
  ProductsResponse,
  useProductListStore,
} from 'entities/index';
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

  setCategory: (category: string) => {
    set(state => {
      const newCategory = state.currentCategory === category ? '' : category;

      if (!newCategory) {
        const {allProductList} = useProductListStore.getState();
        return {currentCategory: '', foundProducts: allProductList};
      }

      set({currentCategory: newCategory});
      get().fetchProducts();

      return {currentCategory: newCategory};
    });
  },

  setSearchText: text => set({searchText: text}),

  fetchProducts: async () => {
    const {currentCategory, searchText} = get();
    try {
      const {data} = await axios.get<ProductsResponse>(
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
      const {data} = await axios.get<CategoryResponse>(
        'https://domennameabcdef.ru/api/categories',
      );
      set({categories: data});
    } catch (error) {
      set({error: true});
    }
  },
}));
