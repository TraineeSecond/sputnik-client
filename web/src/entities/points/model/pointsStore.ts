import { api } from 'shared';
import { create } from 'zustand';

import { PointsResponse, PointsState } from './types';

export const usePointsStore = create<PointsState>((set) => ({
  points: [],
  loadPoints: async () => {
    const { data } = await api.get<PointsResponse>('points');
    set({ points: data });
  },
}));
