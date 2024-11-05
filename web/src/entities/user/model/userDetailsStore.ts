import { create } from 'zustand';

import { IUserDetailsStore } from './types';

export const useUserDetailsStore = create<IUserDetailsStore>((set) => ({
  showLogoutConfirm: false,
  setShowLogoutConfirm(value) {
    set({ showLogoutConfirm: value });
  },
}));
