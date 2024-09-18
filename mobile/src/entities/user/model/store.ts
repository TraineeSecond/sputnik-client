import {User} from 'entities/user';
import {create} from 'zustand';

type ProfileStore = {
  user: User;
  token: string;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
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
  setToken: (token: string) => {
    set({token});
  },
  setUser: (user: User) => {
    set({user});
  },
}));
