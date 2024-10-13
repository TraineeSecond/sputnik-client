import { create } from 'zustand';

import { ProductViewStore } from './types';

export const useProductViewStore = create<ProductViewStore>((set) => ({
  currentImage: null,
  setCurrentImage: (image) => {
    set({ currentImage: image });
  },
}));
