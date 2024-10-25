import { create } from 'zustand';

import { IChangeImageFormState } from './types';

export const useChangeImageFormStore = create<IChangeImageFormState>(
  (set, get) => ({
    showChangeImageFormPopUp: false,
    imagePreview: null,
    imageFile: null,
    toggleShowChangeImageFormPopUp: () => {
      set({ showChangeImageFormPopUp: !get().showChangeImageFormPopUp });
    },
    setImagePreview: (image) => {
      set({ imagePreview: image });
    },
    setImageFile: (file) => {
      set({ imageFile: file });
    },
  }),
);
