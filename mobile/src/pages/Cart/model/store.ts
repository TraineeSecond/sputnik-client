import {create} from 'zustand';
import {CartItemType} from 'entities/CartItem';
import {CartItems} from 'shared/assets/mockData';

type CartStore = {
  items: CartItemType[];

  addItem: (item: CartItemType) => void;
  removeItem: (id: string) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>(set => ({
  items: CartItems,

  addItem: item => set(state => ({items: [...state.items, item]})),

  removeItem: id =>
    set(state => ({items: state.items.filter(item => item.id !== id)})),

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

  clearCart: () => set({items: []}),
}));
