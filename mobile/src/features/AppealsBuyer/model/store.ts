import {User} from 'entities/user';
import {storage} from 'shared/libs/storage';
import {create} from 'zustand';

type AppealsBuyerStore = {
  modalVisible: boolean;
  appealText: string;
  attachedImages: string[];
  setModalVisible: (value: boolean) => void;
  setAppealText: (value: string) => void;
  setAttachedImages: (images: string[]) => void;
};

export const useAppealsBuyer = create<AppealsBuyerStore>(set => ({
  modalVisible: false,
  appealText: '',
  attachedImages: [],

  setModalVisible: (value: boolean) => set({modalVisible: value}),
  setAppealText: (value: string) => set({appealText: value}),
  setAttachedImages: (images: string[]) => set({attachedImages: images}),
}));
