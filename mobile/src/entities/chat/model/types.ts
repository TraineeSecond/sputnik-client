import {Product} from 'entities/product';
import {User} from 'entities/user';

export interface IMessage {
  id: number;
  chatId: number;
  chat?: any[];
  message: string;
  authorId: number;
  author: User;
  reactions: any;
  images?: any[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface Participant {
  chatId: number;
  userId: number;
}

export interface Chat {
  id: number;
  productId: number;
  product: Product;
  messages: IMessage[];
  participants: Participant[];
}
