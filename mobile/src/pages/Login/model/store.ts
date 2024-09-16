import {create} from 'zustand';

type LoginStore = {
  email: string;
  password: string;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
};

export const useLoginStore = create<LoginStore>()(set => ({
  email: '',
  password: '',
  setEmail: (text: string) => set({email: text}),
  setPassword: (text: string) => set({password: text}),
}));
