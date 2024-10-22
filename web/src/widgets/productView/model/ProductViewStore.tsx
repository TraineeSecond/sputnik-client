import { create } from 'zustand';

import { IProductViewStore } from './types';

export const useProductViewStore = create<IProductViewStore>((set) => ({
  currentImage: null,
  setCurrentImage: (image) => {
    set({ currentImage: image });
  },
}));
