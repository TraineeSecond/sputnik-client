import { api } from 'shared';
import { useAuthStore } from 'shared/auth/model/authStore';
import { create } from 'zustand';

import { IOrdersState, TOrdersResponse } from './types';

export const useOrderStore = create<IOrdersState>((set) => ({
  orders: [],
  addOrder: async (cart, pointId, dateString) => {
    const { user } = useAuthStore.getState();
    await api.post('orders', {
      userid: user?.id,
      pointId,
      dateString,
      orderItems: cart,
    });
  },
  loadOrders: async () => {
    const { user } = useAuthStore.getState();
    const { data } = await api.get<TOrdersResponse>(`orders/${user?.id}`);
    set({ orders: data });
  },
}));
