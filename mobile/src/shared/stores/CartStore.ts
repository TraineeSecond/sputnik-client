import {create} from 'zustand';
import axios from 'axios';

import {CartItemType} from 'entities/CartItem';
import {CartItems} from 'shared/assets/mockData';

const makePostRequest = async (
  token: string,
  userid: number,
  items: CartItemType[],
) => {
  try {
    console.log(items);
    const formattedItems = items.map(item => ({
      productid: item.id,
      quantity: item.quantity,
    }));

    console.log('userid', userid);
    console.log('formattedItems ', formattedItems);

    const {data} = await axios.post(
      'https://domennameabcdef.ru/api/basket',
      {
        userid: userid,
        items: formattedItems,
      },
      {
        headers: {
          token,
        },
      },
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

type CartStore = {
  items: CartItemType[];
  isLoading: boolean;

  setIsLoading(isLoading: boolean): void;

  getItems: (token: string, id: number) => Promise<void>;
  createCartFirstTime: (token: string, id: number) => Promise<void>;
  addItem: (item: CartItemType, token: string, id: number) => Promise<void>;
  removeItem: (id: number, token: string, userid: number) => Promise<void>;
  incrementItem: (id: number, token: string, userid: number) => Promise<void>;
  decrementItem: (id: number, token: string, userid: number) => Promise<void>;
  clearCart: (token: string, userid: number) => Promise<void>;
  setItems: (items: CartItemType[]) => void;
};

export const useCartStore = create<CartStore>(set => ({
  items: [],
  isLoading: true,

  setIsLoading: (isLoading: boolean) => set({isLoading}),

  createCartFirstTime: async (token: string, id: number) => {
    try {
      const data = await makePostRequest(token, id, []);
      console.log('createCartFirstTime', data);
      if (data?.basket?.basketItems) {
        set({items: data.basket.basketItems});
      } else {
        console.error('Ошибка при создании корзины');
      }
    } catch (error) {
      console.error('Ошибка при создании корзины:', error);
    }
  },

  getItems: async (token: string, id: number) => {
    try {
      const {data} = await axios.get('https://domennameabcdef.ru/api/basket', {
        params: {
          userid: id,
        },
        headers: {
          token: token,
        },
      });

      if (data?.basket?.basketItems) {
        set({items: data.basket.basketItems});
      } else {
        console.error('Ошибка при получении корзины');
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        await useCartStore.getState().createCartFirstTime(token, id);
      } else {
        console.error('Ошибка при получении корзины:', error);
      }
    }
  },

  addItem: async (item: CartItemType, token: string, userid: number) => {
    const newItems = [...useCartStore.getState().items, item];
    try {
      const data = await makePostRequest(token, userid, newItems);

      if (data?.basket?.basketItems) {
        console.log(data.basket.basketItems);
        set({items: data.basket.basketItems});
      } else {
        //console.error('Ошибка при добавлении товара в корзину');
      }
    } catch (error) {
      console.error(error);
    }
  },

  removeItem: async (id: number, token: string, userid: number) => {
    const newItems = useCartStore
      .getState()
      .items.filter(item => item.id !== id);
    try {
      const data = await makePostRequest(token, userid, newItems);
      if (data?.basket?.basketItems) {
        set({items: data.basket.basketItems});
      } else {
        console.error('Ошибка при удалении из корзины');
      }
    } catch (error) {
      console.error(error);
    }
  },

  incrementItem: async (id: number, token: string, userid: number) => {
    const newItems = useCartStore
      .getState()
      .items.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      );
    try {
      const data = await makePostRequest(token, userid, newItems);
      if (data?.basket?.basketItems) {
        set({items: data.basket.basketItems});
      } else {
        console.error('Ошибка при обновлении количества товара в корзине');
      }
    } catch (error) {
      console.error(error);
    }
  },

  decrementItem: async (id: number, token: string, userid: number) => {
    const newItems = useCartStore
      .getState()
      .items.map(item =>
        item.id === id && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      );
    try {
      const data = await makePostRequest(token, userid, newItems);
      if (data?.basket?.basketItems) {
        set({items: data.basket.basketItems});
      } else {
        console.error('Ошибка при обновлении количества товара в корзине');
      }
    } catch (error) {
      console.error(error);
    }
  },

  clearCart: async (token: string, userid: number) => {
    try {
      const data = await makePostRequest(token, userid, []);
      if (data?.basket?.basketItems) {
        set({items: data.basket.basketItems});
      } else {
        console.error('Ошибка при очистке корзины');
      }
    } catch (error) {
      console.error(error);
    }
  },

  setItems: items => set({items}),
}));
