import { create } from 'zustand';

import { IProductViewStore } from './types';

export const useProductViewStore = create<IProductViewStore>((set) => ({
  currentImage: null,
  showDeleteConfirm: false,
  setCurrentImage: (image) => {
    set({ currentImage: image });
  },
  setShowDeleteConfirm(value) {
    set({ showDeleteConfirm: value });
  },
}));
