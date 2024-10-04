import axios from 'axios';
import {create} from 'zustand';

type CreateProductResponse = {
  id: number;
  description: string;
  category: string;
  price: number;
  new_price: number;
  name: string;
  userId: number;
};

type ListingProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  userId: number;
};

type ProductListingStore = {
  loading: boolean;
  error: string | null;
  currentProduct: ListingProduct;
  setCurrentProductField: (
    field: keyof ListingProduct,
    value: string | number,
  ) => void;
  addProduct: (product: ListingProduct) => Promise<void>;
};

export const useProductListingStore = create<ProductListingStore>(set => ({
  loading: false,
  error: null,
  currentProduct: {
    name: '',
    description: '',
    price: 0,
    category: '',
    userId: 1,
  },

  setCurrentProductField: (field, value) =>
    set(state => ({
      currentProduct: {...state.currentProduct, [field]: value},
    })),

  addProduct: async (product: ListingProduct) => {
    set({loading: true, error: null});
    try {
      await axios.post<CreateProductResponse>(
        'https://domennameabcdef.ru/api/product',
        product,
      );
      set({loading: false});
    } catch (error) {
      console.error(error);
      set({error: 'Ошибка при добавлении продукта', loading: false});
    }
  },
}));
