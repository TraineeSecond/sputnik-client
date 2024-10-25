import { IProduct } from 'entities/product/model/types';
import { IUser } from 'shared/auth/model/types';

export interface IImage {
  id: number;
  image: string;
  productId: number;
}

export interface IChatParticipant {
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
  author: IUser;
}

export interface IChat {
  id: number;
  productId: number;
  product: IProduct;
  participants: IChatParticipant[];
  messages: IMessage[];
}

export interface IPagination {
  skip: number;
  hasMoreMessages: boolean;
  isLoadingMessages: boolean;
}
