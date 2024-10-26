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
  isSearchLoading: boolean;
  isPaginationLoading: boolean;
  isMomentumScroll: boolean;
  error: boolean;
  allProductList: Product[];
  page: number;
  pageSize: number;
  hasMore: boolean;
  incrementPage: () => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setCategory: (category: string) => void;
  setSearchText: (text: string) => void;
  setFoundProducts: (products: Product[]) => void;
  setIsMomentumScroll: (value: boolean) => void;
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchStartData: () => Promise<void>;
};

export const useSearchCatalogStore = create<SearchStore>((set, get) => ({
  category: '',
  searchText: '',
  foundProducts: [],
  hasMore: true,
  isSearchLoading: false,
  isPaginationLoading: false,
  isMomentumScroll: false,
  error: false,
  categories: [],
  allProductList: [],
  page: 1,
  pageSize: 10,

  setFoundProducts: (foundProducts: Product[]) => set({foundProducts}),

  setSearchText: text => set({searchText: text}),

  setPage: (page: number) => set({page}),

  incrementPage: () => set(state => ({page: state.page + 1})),

  setPageSize: (pageSize: number) => set({pageSize}),

  setIsMomentumScroll: (value: boolean) => set({isMomentumScroll: value}),

  setCategory: (category: string) => {
    set(state => {
      const newCategory = state.category === category ? '' : category;
      return {
        category: newCategory,
        foundProducts: [],
        page: 1,
        isSearchLoading: true,
        isPaginationLoading: false,
      };
    });
    get().fetchProducts();
  },

  fetchProducts: async () => {
    const {category, searchText, page, pageSize, foundProducts} = get();
    console.log(1);
    if (page === 1) {
      set({isSearchLoading: true});
    } else {
      set({isPaginationLoading: true});
    }

    try {
      const {data} = await axios.get<ProductsResponse>(
        'https://domennameabcdef.ru/api/products',
        {
          params: {
            category: category,
            ...(searchText && {name: searchText}),
            page,
            pageSize,
          },
        },
      );

      const newProducts = page === 1 ? data : [...foundProducts, ...data];
      const hasMore = data.length === pageSize;

      set({foundProducts: newProducts, hasMore});
    } catch (error) {
      set({error: true});
    } finally {
      set({isSearchLoading: false, isPaginationLoading: false});
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
    set({
      error: false,
      isSearchLoading: true,
      isPaginationLoading: false,
      page: 1,
    });
    try {
      const res = await axios.get<ProductsResponse>(
        'https://domennameabcdef.ru/api/products',
        {
          params: {
            page: 1,
            pageSize: 10,
          },
        },
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
      set({isSearchLoading: false});
    }
  },
}));
