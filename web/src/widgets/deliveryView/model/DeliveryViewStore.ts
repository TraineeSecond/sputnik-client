import { create } from 'zustand';

import { IDeliveryViewStore } from './types';

export const useDeliveryViewStore = create<IDeliveryViewStore>((set) => ({
  selectedPointId: null,
  deliveryDate: null,
  setDeliveryDate: (deliveryDate) => {
    set({ deliveryDate });
  },
  setSelectedPointId: (selectedPointId) => {
    set({ selectedPointId });
  },
}));
