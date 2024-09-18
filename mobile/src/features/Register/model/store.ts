import axios from 'axios';
import {User} from 'entities/user';
import {create} from 'zustand';

type returnedRegisterData = {
  message: string;
  token: string;
  user: User;
};

type RegisterStore = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  checked: boolean;
  isRegistered: boolean;
  setName: (text: string) => void;
  setSurname: (text: string) => void;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  setConfirmPassword: (text: string) => void;
  setChecked: (prev: boolean) => void;
  setIsRegistered: (prev: boolean) => void;
  register: (
    email: string,
    password: string,
    checked: boolean,
    name: string,
  ) => Promise<returnedRegisterData>;
};

export const useRegisterStore = create<RegisterStore>()(set => ({
  name: '',
  surname: '',
  email: '',
  password: '',
  confirmPassword: '',
  checked: false,
  isRegistered: false,

  setName: (text: string) => set({name: text}),
  setSurname: (text: string) => set({surname: text}),
  setEmail: (text: string) => set({email: text}),
  setPassword: (text: string) => set({password: text}),
  setConfirmPassword: (text: string) => set({confirmPassword: text}),
  setChecked: (prev: boolean) => set({checked: !prev}),
  setIsRegistered: (prev: boolean) => set({isRegistered: !prev}),

  register: async (
    email: string,
    password: string,
    checked: boolean,
    name: string,
  ) => {
    try {
      const {data} = await axios.post(
        'https://domennameabcdef.ru/api/register',
        {
          email,
          password,
          role: checked ? 'seller' : 'buyer',
          name,
        },
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  },
}));