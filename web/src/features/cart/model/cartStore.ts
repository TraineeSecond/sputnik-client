import { api } from 'shared';
import { create } from 'zustand';

import { CartItemType, CartResponse } from 'entities/cart/model/types';

type CartStore = {
  items: CartItemType[];
  getCart: (token: string, userId: number) => Promise<void>;
  incrementCartItem: (
    token: string,
    userId: number,
    productid: number,
  ) => Promise<void>;
  decrementCartItem: (
    token: string,
    userId: number,
    productid: number,
  ) => Promise<void>;
  getCartItemQuantity: (productid: number) => number;
  getQuantity: () => number;
  loading: boolean;
  error: string | null;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  loading: false,
  error: null,

  getCart: async (token: string, userId: number) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<CartResponse>('/basket', {
        params: { id: userId },
        headers: { token },
      });
      const cartItems = response.data?.basket?.basketItems || [];
      set({ items: cartItems, loading: false });
    } catch (error) {
      console.error(error);
      set({
        error: 'Не удалось загрузить корзину',
        loading: false,
      });
    }
  },

  incrementCartItem: async (
    token: string,
    userId: number,
    productid: number,
  ) => {
    set({ loading: true, error: null });
    const { items } = get();
    const updatedItems = [...items];

    const existingItem = updatedItems.find(
      (item) => item.productid === productid,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedItems.push({ productid, quantity: 1 });
    }

    try {
      const response = await api.patch<CartResponse>(
        '/basket',
        {
          id: userId,
          items: updatedItems.map((item) => ({
            productId: item.productid,
            quantity: item.quantity,
          })),
        },
        { headers: { token } },
      );
      const cartItems = response.data?.basket?.basketItems || [];
      set({ items: cartItems, loading: false });
    } catch (error) {
      console.error(error);
      set({ error: 'Ошибка при увеличении товара в корзине', loading: false });
    }
  },

  decrementCartItem: async (
    token: string,
    userId: number,
    productid: number,
  ) => {
    set({ loading: true, error: null });
    const { items } = get();
    let updatedItems = [...items];

    const existingItem = updatedItems.find(
      (item) => item.productid === productid,
    );

    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1;
    } else {
      updatedItems = updatedItems.filter(
        (item) => item.productid !== productid,
      );
    }

    try {
      const response = await api.patch<CartResponse>(
        '/basket',
        {
          id: userId,
          items: updatedItems.map((item) => ({
            productId: item.productid,
            quantity: item.quantity,
          })),
        },
        { headers: { token } },
      );
      const cartItems = response.data?.basket?.basketItems || [];
      set({ items: cartItems, loading: false });
    } catch (error) {
      console.error(error);
      set({ error: 'Ошибка при уменьшении товара в корзине', loading: false });
    }
  },

  getCartItemQuantity: (productid: number) => {
    const { items } = get();
    const cartItem = items.find((item) => item.productid === productid);
    return cartItem ? cartItem.quantity : 0;
  },

  getQuantity: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
