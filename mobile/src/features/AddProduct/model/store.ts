import axios from 'axios';
import {User} from 'entities/user';
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

type AddProductStore = {
  loading: boolean;
  error: string | null;
  addProduct: (product: ListingProduct) => Promise<void>;
};

export const useAddProductStore = create<AddProductStore>(set => ({
  loading: false,
  error: null,

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
