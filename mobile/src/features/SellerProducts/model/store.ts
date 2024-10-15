import axios from 'axios';
import {Product} from 'entities/product';
import {useUserStore} from 'entities/user';
import {create} from 'zustand';

type SellerProductsStore = {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchSellerProducts: () => Promise<void>;
};

export const useSellerProductsStore = create<SellerProductsStore>(set => ({
  products: [],
  loading: false,
  error: null,

  fetchSellerProducts: async () => {
    set({loading: true, error: null});
    try {
      const {id: userId} = useUserStore.getState().user;
      const response = await axios.get<Product[]>(
        `https://domennameabcdef.ru/api/products?userid=${userId}`,
      );
      set({products: response.data, loading: false});
    } catch (error) {
      set({error: 'Ошибка', loading: false});
    }
  },
}));
