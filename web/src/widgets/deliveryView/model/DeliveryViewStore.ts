import { create } from 'zustand';

import { DeliveryViewStore } from './types';

export const useDeliveryViewStore = create<DeliveryViewStore>((set) => ({
  selectedPointId: null,
  deliveryDate: null,
  setDeliveryDate: (deliveryDate) => {
    set({ deliveryDate });
  },
  setSelectedPointId: (selectedPointId) => {
    set({ selectedPointId });
  },
}));
