import { create } from 'zustand';
import { FiltersState } from './types';


export const useFiltersStore = create<FiltersState>((set, get) => ({
    showFilterPopUp: false,
    toggleShowFilterPopUp: () => {
        set({ showFilterPopUp: !get().showFilterPopUp })
    }
}));
