import { Product } from 'entities/product/model/types';
import { User } from 'shared/auth/model/types';

export interface Image {
  id: number;
  image: string;
  productId: number;
}

export interface ChatParticipant {
  chatId: number;
  userId: number;
}

export interface IMessage {
  id: number;
  chatId: number;
  message: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  reactions: string;
  images: [];
  author: User;
}

export interface Chat {
  id: number;
  productId: number;
  product: Product;
  participants: ChatParticipant[];
  messages: IMessage[];
}

export interface Pagination {
  skip: number;
  hasMoreMessages: boolean;
  isLoadingMessages: boolean;
}
