import axios from 'axios';
import {Appeal, FormAppeal, User} from 'entities';
import {storage} from 'shared/libs/storage';
import {create} from 'zustand';

type AppealsBuyerStore = {
  modalVisible: boolean;
  appealText: string;
  attachedImages: string[];
  appeals: Appeal[];

  setAppeals: (appeal: Appeal) => void;

  getAppeals(userId: number): Promise<void>;
  sendAppeal(appeal: FormAppeal): Promise<void>;

  setModalVisible: (value: boolean) => void;
  setAppealText: (value: string) => void;
  setAttachedImages: (images: string[]) => void;
};

export const useAppealsBuyer = create<AppealsBuyerStore>((set, get) => ({
  modalVisible: false,
  appealText: '',
  attachedImages: [],
  appeals: [],

  setAppeals: (appeal: Appeal) => {
    set({appeals: [appeal, ...get().appeals]});
  },

  setModalVisible: (value: boolean) => set({modalVisible: value}),
  setAppealText: (value: string) => set({appealText: value}),
  setAttachedImages: (images: string[]) => set({attachedImages: images}),

  getAppeals: async (userId: number) => {
    try {
      const response = await axios.get<Appeal[]>(
        `http://172.20.10.2:5556/appeals/${userId}`,
        // `https://domennameabcdef.ru/api/appeals/${userId}`,
      );
      if (response.data) {
        set({appeals: response.data});
      } else {
        set({appeals: []});
      }
    } catch (error) {
      console.error(error);
    }
  },

  sendAppeal: async (appeal: FormAppeal) => {
    try {
      const response = await axios.post<Appeal>(
        // `https://domennameabcdef.ru/api/appeals`,
        `http://172.20.10.2:5556/appeals/`,
        // 172.20.10.2
        appeal,
      );
      console.log(response.data);
      if (response.data) {
        set({appeals: [response.data, ...get().appeals]});
      }
    } catch (error) {
      console.error(error);
    }
  },
}));
