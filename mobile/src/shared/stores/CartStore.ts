import {create} from 'zustand';
import axios from 'axios';

import {
  CartItemsFromServerType,
  CartItemType,
  ICartFromServer,
} from 'entities/CartItem';
import {storage} from 'shared/libs/storage';

const makePatchRequest = async (
  token: string,
  id: number,
  items: CartItemType[],
) => {
  try {
    console.log(items);
    const formattedItems = items.map(item => ({
      quantity: item.quantity,
      productId: item.id,
    }));

    console.log('idBasket', id);
    console.log('formattedItems ', formattedItems);

    const {data} = await axios.patch(
      'https://domennameabcdef.ru/api/basket',
      {
        id,
        items: formattedItems,
      },
      {
        headers: {
          token,
        },
      },
    );

    if (data?.basket?.basketItems) {
      return data;
    }
  } catch (error: any) {
    console.error(error.response);
  }
};

type CartStore = {
  id: number;
  itemsFromServer: CartItemsFromServerType[];
  items: CartItemType[];
  isLoading: boolean;

  setIsLoading(isLoading: boolean): void;

  getItems: (token: string, id: number) => Promise<void>;
  addItem: (item: CartItemType, token: string, id: number) => Promise<void>;
  removeItem: (id: number, token: string, userid: number) => Promise<void>;
  incrementItem: (id: number, token: string, userid: number) => Promise<void>;
  decrementItem: (id: number, token: string, userid: number) => Promise<void>;
  clearCart: (token: string, userid: number) => Promise<void>;
  getItemById: (id: number, token: string) => Promise<CartItemType | undefined>;
  setBasket: (basket: ICartFromServer) => void;
  loadBasket: () => Promise<void>;
};

export const useCartStore = create<CartStore>(set => ({
  id: 0,
  items: [],
  itemsFromServer: [],
  isLoading: true,

  setIsLoading: (isLoading: boolean) => set({isLoading}),

  getItems: async (token: string, id: number) => {
    try {
      const {data} = await axios.get('https://domennameabcdef.ru/api/basket', {
        params: {
          id,
        },
        headers: {
          token: token,
        },
      });

      console.log(data);

      if (data?.basket?.basketItems) {
        const basketItems = data.basket.basketItems;

        const detailedItems = await Promise.all(
          basketItems.map(
            async (basketItem: {productid: number; quantity: number}) => {
              const itemDetails = await useCartStore
                .getState()
                .getItemById(basketItem.productid, token);

              if (itemDetails) {
                return {
                  ...itemDetails,
                  quantity: basketItem.quantity,
                };
              }
              return null;
            },
          ),
        );

        const filteredItems = detailedItems.filter(item => item !== null);
        set({items: filteredItems as CartItemType[]});
      } else {
        console.error('Ошибка при получении корзины');
      }
    } catch (error: any) {
      console.error('Ошибка при получении корзины:', error);
    }
  },

  addItem: async (item: CartItemType, token: string, id: number) => {
    const newItems = [...useCartStore.getState().items, item];
    try {
      const data = await makePatchRequest(token, id, newItems);

      if (data?.basket?.basketItems) {
        const basketItems = data.basket.basketItems;

        const detailedItems = await Promise.all(
          basketItems.map(
            async (basketItem: {productid: number; quantity: number}) => {
              const itemDetails = await useCartStore
                .getState()
                .getItemById(basketItem.productid, token);

              if (itemDetails) {
                return {
                  ...itemDetails,
                  quantity: basketItem.quantity,
                };
              }
              return null;
            },
          ),
        );

        // Оставляем только успешные элементы
        const filteredItems = detailedItems.filter(item => item !== null);
        set({items: filteredItems as CartItemType[]});
      } else {
        console.error('Ошибка при добавлении товара в корзину');
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
      const data = await makePatchRequest(token, userid, newItems);
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
      const data = await makePatchRequest(token, userid, newItems);
      console.log(data);
      if (data?.basket?.basketItems) {
        const basketItems = data.basket.basketItems;

        const detailedItems = await Promise.all(
          basketItems.map(
            async (basketItem: {productid: number; quantity: number}) => {
              const itemDetails = await useCartStore
                .getState()
                .getItemById(basketItem.productid, token);

              if (itemDetails) {
                return {
                  ...itemDetails,
                  quantity: basketItem.quantity,
                };
              }
              return null;
            },
          ),
        );

        // Оставляем только успешные элементы
        const filteredItems = detailedItems.filter(item => item !== null);
        set({items: filteredItems as CartItemType[]});
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
      const data = await makePatchRequest(token, userid, newItems);
      console.log(data);
      if (data?.basket?.basketItems) {
        const basketItems = data.basket.basketItems;

        const detailedItems = await Promise.all(
          basketItems.map(
            async (basketItem: {productid: number; quantity: number}) => {
              const itemDetails = await useCartStore
                .getState()
                .getItemById(basketItem.productid, token);

              if (itemDetails) {
                return {
                  ...itemDetails,
                  quantity: basketItem.quantity,
                };
              }
              return null;
            },
          ),
        );

        // Оставляем только успешные элементы
        const filteredItems = detailedItems.filter(item => item !== null);
        set({items: filteredItems as CartItemType[]});
      } else {
        console.error('Ошибка при обновлении количества товара в корзине');
      }
    } catch (error) {
      console.error(error);
    }
  },

  clearCart: async (token: string, userid: number) => {
    try {
      const data = await makePatchRequest(token, userid, []);
      if (data?.basket?.basketItems) {
        set({items: data.basket.basketItems});
      } else {
        console.error('Ошибка при очистке корзины');
      }
    } catch (error) {
      console.error(error);
    }
  },

  getItemById: async (id: number, token: string) => {
    try {
      const {data} = await axios.get(`https://domennameabcdef.ru/api/product`, {
        params: {
          id,
        },
        headers: {
          token,
        },
      });

      console.log(data);

      return {
        id: data.id,
        title: data.name,
        price: data.new_price || data.price,
        image: data.image,
        quantity: 10,
      } as CartItemType;
    } catch (error: any) {
      console.error(error.response);
      console.error(`Ошибка при получении товара с id ${id}:`, error);
    }
  },

  setBasket: basket => {
    storage.set('basket', JSON.stringify(basket));
    set({id: basket.id, itemsFromServer: basket.basketItems});
  },

  loadBasket: async () => {
    const basketstring = storage.getString('basket');
    if (basketstring) {
      const basketobj = JSON.parse(basketstring);
      set({id: basketobj.id, itemsFromServer: basketobj.basketItems});
    }
  },
}));
