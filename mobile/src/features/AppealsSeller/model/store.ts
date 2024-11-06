import axios from 'axios';
import {Appeal} from 'entities';
import {create} from 'zustand';

type AppealsSellerStore = {
  appeals: Appeal[];

  loading: boolean;
  error: boolean;
  refreshing: boolean;
  setRefreshing: (value: boolean) => void;

  getAppeals(userId: number): Promise<void>;
  sendResultAppeal(
    appealId: number,
    newStatus: 'rejected' | 'accepted',
  ): Promise<void>;
};

export const useAppealsSeller = create<AppealsSellerStore>((set, get) => ({
  appeals: [],

  loading: false,
  error: false,

  refreshing: false,
  setRefreshing: (value: boolean) => set({refreshing: value}),

  getAppeals: async (userId: number) => {
    try {
      set({loading: true, error: false});
      const response = await axios.get<Appeal[]>(
        `https://domennameabcdef.ru/api/appeals/${userId}`,
      );
      if (response.data) {
        set({appeals: response.data});
      } else {
        set({appeals: []});
      }
      set({loading: false});
    } catch (error) {
      console.error(error);
      set({loading: false, error: true, appeals: []});
    }
  },
  sendResultAppeal: async (
    appealId: number,
    newStatus: 'rejected' | 'accepted',
  ) => {
    try {
      set({loading: true, error: false});
      await axios.put<Appeal[]>(`https://domennameabcdef.ru/api/appeals`, {
        appealId,
        newStatus,
      });
      const newAppealsList = get().appeals.map(appeal =>
        appeal.id === appealId ? {...appeal, status: newStatus} : appeal,
      );
      set({appeals: newAppealsList});
      set({loading: false});
    } catch (error) {
      console.error(error);
      set({loading: false, error: true, appeals: []});
    }
  },
}));
