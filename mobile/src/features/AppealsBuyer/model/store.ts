import axios from 'axios';
import {Appeal, FormAppeal} from 'entities';
import {create} from 'zustand';

type AppealsBuyerStore = {
  modalVisible: boolean;
  appealText: string;
  attachedImages: string[];
  appeals: Appeal[];

  loading: boolean;
  error: boolean;
  refreshing: boolean;
  setRefreshing: (value: boolean) => void;

  getAppeals(userId: number): Promise<void>;
  sendAppeal(appeal: FormAppeal): Promise<void>;
  deleteAppeal(appealId: number): Promise<void>;

  setModalVisible: (value: boolean) => void;
  setAppealText: (value: string) => void;
  setAttachedImages: (images: string[]) => void;
};

export const useAppealsBuyer = create<AppealsBuyerStore>((set, get) => ({
  modalVisible: false,
  appealText: '',
  attachedImages: [],
  appeals: [],

  loading: false,
  error: false,

  refreshing: false,
  setRefreshing: (value: boolean) => set({refreshing: value}),

  setModalVisible: (value: boolean) => set({modalVisible: value}),
  setAppealText: (value: string) => set({appealText: value}),
  setAttachedImages: (images: string[]) => set({attachedImages: images}),

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

  sendAppeal: async (appeal: FormAppeal) => {
    try {
      set({loading: true, error: false});
      const formData = new FormData();

      formData.append('productId', appeal.productId);
      formData.append('problem', appeal.problem);
      formData.append('buyerId', appeal.buyerId);
      formData.append('sellerId', appeal.sellerId);
      if (appeal.images) {
        appeal.images.forEach((image, index) => {
          formData.append('images', {
            uri: image,
            name: `image_${index}.jpg`,
            type: 'image/jpeg',
          });
        });
      }
      const response = await axios.post<Appeal>(
        // `https://domennameabcdef.ru/api/appeals`,
        `http://10.0.85.2:5556/appeals/`,
        // 172.20.10.2
        // 192.168.0.11
        // 10.0.85.2
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.data) {
        set({appeals: [...get().appeals, response.data]});
      }
      set({loading: false});
    } catch (error) {
      console.error(error);
      set({loading: false, error: true});
    }
  },

  deleteAppeal: async (appealId: number) => {
    set({loading: true, error: false});
    try {
      // await axios.delete(`https://domennameabcdef.ru/api/chats/${chatId}`);
      await axios.delete(`http://10.0.85.2:5556/appeals/${appealId}`);

      set(state => ({
        appeals: state.appeals.filter(appeal => appeal.id !== appealId),
        loading: false,
      }));
    } catch (error) {
      set({error: true, loading: false});
    }
  },
}));
