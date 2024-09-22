import {create} from 'zustand';
import {CartItemType} from 'entities/CartItem';

type CartStore = {
  items: CartItemType[];

  addItem: (item: CartItemType) => void;
  removeItem: (id: string) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  clearCart: () => void;
  setItems: (items: CartItemType[]) => void;
};

export const useCartStore = create<CartStore>(set => ({
  items: [],

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

  setItems: items => set({items}),
}));
