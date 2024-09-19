import {User} from 'entities/user';
import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProfileStore = {
  user: User;
  token: string;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  loadUserData: () => Promise<void>;
  clearUserData: () => Promise<void>;
};

export const useUserStore = create<ProfileStore>(set => ({
  user: {
    id: '',
    email: '',
    role: '',
    name: '',
    surname: '',
  },
  token: '',
  setToken: async (token: string) => {
    set({token});
    await AsyncStorage.setItem('token', token);
  },
  setUser: async (user: User) => {
    set({user});
    await AsyncStorage.setItem('user', JSON.stringify(user));
  },
  loadUserData: async () => {
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    if (token) {
      set({token});
    }
    if (user) {
      set({user: JSON.parse(user)});
    }
  },
  clearUserData: async () => {
    set({
      user: {id: '', email: '', role: '', name: '', surname: ''},
      token: '',
    });
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  },
}));
