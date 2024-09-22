export type UserRole = 'buyer' | 'seller';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}
