import { create } from 'zustand';

import { IFiltersState } from './types';

export const useFiltersStore = create<IFiltersState>((set, get) => ({
  showFilterPopUp: false,
  toggleShowFilterPopUp: () => {
    set({ showFilterPopUp: !get().showFilterPopUp });
  },
}));
