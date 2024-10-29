import {ImageSourcePropType} from 'react-native';

import {Product} from 'entities/product';
import {User} from 'entities/user';

export interface IMessage {
  id: number;
  chatId: number;
  chat?: any[];
  message: string;
  authorId: number;
  author: User;
  reactions: Reactions[];
  images: TImages[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isSending?: boolean;
  isRead: boolean;
  hasError?: boolean;
}

export type TImages = {
  id: number;
  image: string;
  messageId: number;
};

export interface Reactions {
  reaction: string;
  count: number;
}

export interface Participant {
  user: User;
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
