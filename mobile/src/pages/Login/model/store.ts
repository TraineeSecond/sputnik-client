import axios from 'axios';
import {create} from 'zustand';

type LoginStore = {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  login: (email: string, password: string) => Promise<void>;
};

export const useLoginStore = create<LoginStore>((set, get) => ({
  email: '',
  password: '',

  setEmail: (email: string) => set({email}),
  setPassword: (password: string) => set({password}),

  login: async (email: string, password: string) => {
    try {
      const {data} = await axios.post('https://domennameabcdef.ru/api/login', {
        email,
        password,
      });

      return data;
    } catch (error) {
      console.error(error);
    }
  },
}));
