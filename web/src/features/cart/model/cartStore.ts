import { api } from 'shared';
import { create } from 'zustand';

import { CartItemType, CartResponse } from 'entities/cart/model/types';
import { Product } from 'entities/product/model/types';

type CartStore = {
  items: CartItemType[];
  cartDetails: { [key: number]: Product };
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
  error: string | null;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  cartDetails: {},
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

  loadCartDetails: async () => {
    const { items, cartDetails } = get();

    const existingProductIds = new Set(Object.keys(cartDetails).map(Number));
    const productIdsToFetch = items
      .map((item) => item.productid)
      .filter((id) => !existingProductIds.has(id));

    if (productIdsToFetch.length === 0) {
      return;
    }

    try {
      const productPromises = productIdsToFetch.map((id) =>
        api.get<Product>(`/product`, { params: { id } }),
      );

      const productResponses = await Promise.all(productPromises);
      const newProductDetails = productResponses.reduce(
        (acc, response) => {
          const product = response.data;
          acc[product.id] = product;
          return acc;
        },
        {} as { [key: number]: Product },
      );

      set((state) => ({
        cartDetails: {
          ...state.cartDetails,
          ...newProductDetails,
        },
      }));
    } catch (error) {
      console.error('Ошибка загрузки деталей товаров', error);
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
