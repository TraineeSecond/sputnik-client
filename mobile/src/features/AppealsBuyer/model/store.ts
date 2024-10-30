import {User} from 'entities/user';
import {storage} from 'shared/libs/storage';
import {create} from 'zustand';

type AppealsBuyerStore = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
};

export const useAppealsBuyer = create<AppealsBuyerStore>(set => ({
  modalVisible: false,
  setModalVisible: (value: boolean) => set({modalVisible: value}),
}));
