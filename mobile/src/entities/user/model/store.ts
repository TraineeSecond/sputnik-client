import {User} from 'entities/user';
import {storage} from 'shared/libs/storage';
import {create} from 'zustand';

type ProfileStore = {
  user: User;
  token: string;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  loadUserData: () => Promise<void>;
  clearUserData: () => void;
};

export const useUserStore = create<ProfileStore>(set => ({
  user: {
    id: 0,
    email: '',
    role: '',
    name: '',
    surname: '',
  },
  token: '',
  setToken: (token: string) => {
    set({token});
    storage.set('token', token);
  },
  setUser: (user: User) => {
    set({user});
    storage.set('user', JSON.stringify(user));
  },
  loadUserData: async () => {
    const token = storage.getString('token');
    const user = storage.getString('user');
    if (token) {
      set({token});
    }
    if (user) {
      set({user: JSON.parse(user)});
    }
  },
  clearUserData: () => {
    set({
      user: {id: 0, email: '', role: '', name: '', surname: ''},
      token: '',
    });
    storage.delete('token');
    storage.delete('user');
  },
}));
