import {create} from 'zustand';
import axios from 'axios';

import {CartItemType} from 'entities/CartItem';
import {CartItems} from 'shared/assets/mockData';

type CartStore = {
  items: CartItemType[];
  isLoading: boolean;

  setIsLoading(isLoading: boolean): void;

  getItems: (token: string, id: string) => Promise<void>;
  createCartFirstTime: (token: string, id: string) => Promise<void>;
  addItem: (item: CartItemType, token: string, id: string) => Promise<void>;
  removeItem: (id: string, token: string, userid: string) => Promise<void>;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  clearCart: () => void;
  setItems: (items: CartItemType[]) => void;
};

export const useCartStore = create<CartStore>(set => ({
  items: CartItems,
  isLoading: true,

  setIsLoading: (isLoading: boolean) => set({isLoading}),

  createCartFirstTime: async (token: string, id: string) => {
    try {
      const {data} = await axios.post(
        'https://domennameabcdef.ru/api/basket',
        {
          userid: id,
          items: [],
        },
        {
          headers: {
            token: token,
          },
        },
      );
      set({items: data.basket.basketItems});
      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  },

  getItems: async (token: string, id: string) => {
    try {
      const {data} = await axios.get('https://domennameabcdef.ru/api/basket', {
        params: {
          userid: id,
        },
        headers: {
          token: token,
        },
      });

      set({items: data?.basket?.basketItems});
    } catch (error: any) {
      if (error.response?.status === 404) {
        await useCartStore.getState().createCartFirstTime(token, id);
      } else {
        console.error('Ошибка при получении корзины:', error);
      }
    }
  },

  addItem: async (item: CartItemType, token: string, userid: string) => {
    try {
      const {data} = await axios.post(
        'https://domennameabcdef.ru/api/basket',
        {
          userid,
          items: [...useCartStore.getState().items, item],
        },
        {
          headers: {
            token: token,
          },
        },
      );
      if (data?.basket?.basketItems) {
        set({items: data.basket.basketItems});
      } else {
        console.error('Ошибка при добавлении товара в корзину:');
      }
    } catch (error: any) {
      console.error(error.message);
    }
    set(state => ({items: [...state.items, item]}));
  },

  removeItem: async (id: string, token: string, userid: string) => {
    try {
      const {data} = await axios.post(
        'https://domennameabcdef.ru/api/basket',
        {
          userid,
          items: [useCartStore.getState().items.filter(item => item.id !== id)],
        },
        {
          headers: {
            token: token,
          },
        },
      );
      set({items: data?.basket?.basketItems});
    } catch (error) {
      console.error(error);
    }
    set({
      items: useCartStore.getState().items.filter(item => item.id !== id),
    });
  },

  incrementItem: id =>
    set(state => ({
      items: state.items.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    })),

  decrementItem: id =>
    set(state => ({
      items: state.items.map(item =>
        item.id === id && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    })),

  //TODO: добавить запрос на отчистку корзины при заказе

  clearCart: () => set({items: []}),

  setItems: items => set({items}),
}));
