import {Product} from 'entities/product';
import {User} from 'entities/user';

export interface IMessage {
  id: number;
  message: string;
  author: User;
  reactions: any;
  images?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface Chat {
  id: number;
  product: Product;
  messages: IMessage[];
}
