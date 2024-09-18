import {User} from 'entities/user';
import {create} from 'zustand';

type ProfileStore = {
  user: User;

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

  setUser: (user: User) => {
    set({user});
  },
}));
