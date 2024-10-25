import { api } from 'shared';
import { create } from 'zustand';

import {
  CartDetails,
  CartItemType,
  CartResponse,
} from 'entities/cart/model/types';
import { IProduct } from 'entities/product/model/types';

type CartStore = {
  items: CartItemType[];
  cartDetails: CartDetails;
  getCart: (token: string, userId: number) => Promise<void>;
  loadCartDetails: () => Promise<void>;
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
  removeCartItem: (
    token: string,
    userId: number,
    productid: number,
  ) => Promise<void>;
  getTotalPrice: () => number;
  getCartItemQuantity: (productid: number) => number;
  getQuantity: () => number;
  loading: boolean;
  loadingDetails: boolean;
  error: string | null;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  cartDetails: {},
  loading: false,
  loadingDetails: false,
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

  loadCartDetails: async () => {
    set({ loadingDetails: true });
    const { items, cartDetails } = get();

    const itemsToFetch = items.filter((item) => !cartDetails[item.productid]);
    if (itemsToFetch.length === 0) {
      set({ loadingDetails: false });
      return;
    }

    try {
      const productPromises = itemsToFetch.map((item) =>
        api.get<IProduct>(`/product`, { params: { id: item.productid } }),
      );

      const productResponses = await Promise.all(productPromises);
      const newProductDetails = productResponses.reduce<CartDetails>(
        (acc, response) => {
          const product = response.data;
          acc[product.id] = product;
          return acc;
        },
        {},
      );

      set((state) => ({
        cartDetails: {
          ...state.cartDetails,
          ...newProductDetails,
        },
        loadingDetails: false,
      }));
    } catch (error) {
      console.error('Ошибка загрузки деталей товаров', error);
      set({ loadingDetails: false });
    }
  },

  incrementCartItem: async (token, userId, productid) => {
    const { items } = get();

    const existingItem = items.find((item) => item.productid === productid);
    let updatedItems;

    if (existingItem) {
      updatedItems = items.map((item) =>
        item.productid === productid
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      updatedItems = [...items, { productid, quantity: 1 }];
    }

    set({ items: updatedItems });

    try {
      await api.patch<CartResponse>(
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
    } catch (error) {
      console.error(error);
      set({ error: 'Ошибка при увеличении товара в корзине' });
    }
  },

  decrementCartItem: async (token, userId, productid) => {
    const { items } = get();

    const existingItem = items.find((item) => item.productid === productid);
    if (!existingItem) return;

    let updatedItems;
    if (existingItem.quantity > 1) {
      updatedItems = items.map((item) =>
        item.productid === productid
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    } else {
      updatedItems = items.filter((item) => item.productid !== productid);
    }

    set({ items: updatedItems });

    try {
      await api.patch<CartResponse>(
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
    } catch (error) {
      console.error(error);
      set({ error: 'Ошибка при уменьшении товара в корзине' });
    }
  },

  removeCartItem: async (token, userId, productid) => {
    const { items } = get();

    const updatedItems = items.filter((item) => item.productid !== productid);
    set({ items: updatedItems });

    try {
      await api.patch<CartResponse>(
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
    } catch (error) {
      console.error(error);
      set({ error: 'Ошибка при удалении товара из корзины' });
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

  getTotalPrice: () => {
    const { items, cartDetails } = get();
    return items.reduce((total, item) => {
      const product = cartDetails[item.productid];
      if (!product) {
        return total;
      }
      const actualPrice =
        product.new_price && product.new_price < product.price
          ? product.new_price
          : product.price;
      return total + item.quantity * actualPrice;
    }, 0);
  },
}));
