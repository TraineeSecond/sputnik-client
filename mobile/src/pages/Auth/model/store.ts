import axios from 'axios';
import {create} from 'zustand';

type AuthStore = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  checked: boolean;
  isLoginPage: boolean;
  authorized: boolean;
  setName: (text: string) => void;
  setSurname: (text: string) => void;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  setConfirmPassword: (text: string) => void;
  setChecked: (prev: boolean) => void;
  setIsLoginPage: (prev: boolean) => void;
  setauthorized: (prev: boolean) => void;
  register: (
    email: string,
    password: string,
    checked: boolean,
    name: string,
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
};

export const useAuthStore = create<AuthStore>()(set => ({
  name: '',
  surname: '',
  email: '',
  password: '',
  confirmPassword: '',
  checked: false,
  isLoginPage: true, // для условного рендеринга страницы авторизации
  authorized: false, // для проверки авторизован ли пользователь и показывать страницу профиля

  setName: (text: string) => set({name: text}),
  setSurname: (text: string) => set({surname: text}),
  setEmail: (text: string) => set({email: text}),
  setPassword: (text: string) => set({password: text}),
  setConfirmPassword: (text: string) => set({confirmPassword: text}),
  setChecked: (prev: boolean) => set({checked: !prev}),
  setIsLoginPage: (prev: boolean) => set({isLoginPage: !prev}),
  setauthorized: (prev: boolean) => set({authorized: !prev}),

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
