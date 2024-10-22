import { api } from 'shared';
import { create } from 'zustand';

import { IPointsState, TPointsResponse } from './types';

export const usePointsStore = create<IPointsState>((set) => ({
  points: [],
  loadPoints: async () => {
    const { data } = await api.get<TPointsResponse>('points');
    set({ points: data });
  },
}));
