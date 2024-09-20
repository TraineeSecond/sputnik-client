import { User, UserRole } from 'entities/user/model/types';

export interface JwtPayload extends User {
  iat: number;
  exp: number;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    name: string;
    surname: string;
    email: string;
    password: string;
    role: UserRole;
  }) => Promise<void>;
  logout: () => void;
  loadUserFromToken: () => void;
}

export interface AuthResponse {
  token: string;
  user: User;
}
