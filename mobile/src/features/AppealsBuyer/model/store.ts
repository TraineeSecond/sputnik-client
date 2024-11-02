import axios from 'axios';
import {Appeal, FormAppeal, User} from 'entities';
import {storage} from 'shared/libs/storage';
import {create} from 'zustand';

type AppealsBuyerStore = {
  modalVisible: boolean;
  appealText: string;
  attachedImages: string[];
  appeals: Appeal[];

  loading: boolean;
  error: string | null;

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

  loading: false,
  error: null,

  setAppeals: (appeal: Appeal) => {
    set({appeals: [appeal, ...get().appeals]});
  },

  setModalVisible: (value: boolean) => set({modalVisible: value}),
  setAppealText: (value: string) => set({appealText: value}),
  setAttachedImages: (images: string[]) => set({attachedImages: images}),

  getAppeals: async (userId: number) => {
    try {
      set({loading: true, error: null});
      console.log(userId);
      const response = await axios.get<Appeal[]>(
        `http://192.168.0.11:5556/appeals/${userId}`,
        // `https://domennameabcdef.ru/api/appeals/${userId}`,
      );
      if (response.data) {
        set({appeals: response.data});
      } else {
        set({appeals: []});
      }
      set({loading: false});
    } catch (error) {
      console.error(error);
      set({loading: false, error: 'Ошибка', appeals: []});
    }
  },

  sendAppeal: async (appeal: FormAppeal) => {
    try {
      set({loading: true, error: null});
      const formData = new FormData();

      formData.append('productId', appeal.productId);
      formData.append('problem', appeal.problem);
      formData.append('buyerId', appeal.buyerId);
      formData.append('sellerId', appeal.sellerId);
      console.log('appeal', appeal);
      if (appeal.images) {
        appeal.images.forEach((image, index) => {
          formData.append('images', {
            uri: image,
            name: `image_${index}.jpg`,
            type: 'image/jpeg',
          });
        });
      }

      console.log(formData);
      console.log(formData);

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
      console.log(response.data);
      if (response.data) {
        set({appeals: [response.data, ...get().appeals]});
      }
      set({loading: false});
    } catch (error) {
      console.error(error);
      set({loading: false, error: 'Ошибка'});
    }
  },
}));
