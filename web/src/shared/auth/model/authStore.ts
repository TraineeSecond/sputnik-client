import { jwtDecode } from 'jwt-decode';
import api from 'shared/api/api';
import { create } from 'zustand';

import {
  IAuthResponse,
  IAuthState,
  IJwtPayload,
} from 'shared/auth/model/types';

const decodeAndValidateToken = (token: string): IJwtPayload | null => {
  try {
    const payload = jwtDecode<IJwtPayload>(token);

    if (payload.id && payload.email && payload.name && payload.role) {
      return payload;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Ошибка при декодировании токена:', error);
    return null;
  }
};

export const useAuthStore = create<IAuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: null,
  isLoading: true,

  register: async (data) => {
    try {
      const response = await api.post<IAuthResponse>('/register', data);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      set({
        token,
        user,
        isLoading: false,
      });
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.post<IAuthResponse>('/login', {
        email,
        password,
      });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      set({
        token,
        user,
        isLoading: false,
      });
    } catch (error) {
      console.error('Ошибка при входе:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({
      token: null,
      user: null,
      isLoading: false,
    });
  },

  loadUserFromToken: () => {
    const token = localStorage.getItem('token');

    if (!token) {
      set({ isLoading: false });
      return;
    }

    const payload = decodeAndValidateToken(token);

    if (payload) {
      set({
        token,
        user: {
          id: payload.id,
          name: payload.name,
          email: payload.email,
          role: payload.role,
        },
        isLoading: false,
      });
    } else {
      localStorage.removeItem('token');
      set({
        token: null,
        user: null,
        isLoading: false,
      });
    }
  },
}));
