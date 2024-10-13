import { create } from 'zustand';

import { ChangeImageFormState } from './types';

export const useChangeImageFormStore = create<ChangeImageFormState>(
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
