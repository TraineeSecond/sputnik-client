import {User} from 'entities/user';

export type Product = {
  id: number;
  category: string;
  description: string;
  name: string;
  price: number;
  new_price: number;
  user: User;
};
