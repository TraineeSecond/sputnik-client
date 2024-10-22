import { api } from 'shared';
import { useAuthStore } from 'shared/auth/model/authStore';
import { create } from 'zustand';

import { OrdersResponse, OrdersState } from './types';

export const useOrderStore = create<OrdersState>((set) => ({
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
    const { data } = await api.get<OrdersResponse>(`orders/${user?.id}`);
    set({ orders: data });
  },
}));
