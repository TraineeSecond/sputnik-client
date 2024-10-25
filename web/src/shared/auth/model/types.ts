export type TUserRole = 'buyer' | 'seller';

export interface IUser {
  id: number;
  name: string;
  surname?: string;
  email: string;
  role: TUserRole;
}

export interface IJwtPayload extends IUser {
  iat: number;
  exp: number;
}

export interface IAuthState {
  token: string | null;
  user: IUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    name: string;
    surname: string;
    email: string;
    password: string;
    role: TUserRole;
  }) => Promise<void>;
  logout: () => void;
  loadUserFromToken: () => void;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}
