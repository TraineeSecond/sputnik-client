import axios from 'axios';
import {ICartFromServer} from 'entities/CartItem';
import {User} from 'entities/user';
import {create} from 'zustand';

type returnedRegisterData = {
  message: string;
  token: string;
  user: User;
  basket: ICartFromServer;
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
  clear: () => void;
  register: (
    email: string,
    password: string,
    checked: boolean,
    name: string,
    surname: string,
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
  clear: () =>
    set({email: '', password: '', checked: false, name: '', surname: ''}),

  register: async (
    email: string,
    password: string,
    checked: boolean,
    name: string,
    surname: string,
  ) => {
    try {
      const {data} = await axios.post(
        'https://domennameabcdef.ru/api/register',
        {
          email,
          password,
          role: checked ? 'seller' : 'buyer',
          name,
          surname,
        },
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  },
}));
