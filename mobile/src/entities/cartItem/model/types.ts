import {ImageOwn} from 'entities/product';

export type CartItemType = {
  id: number;
  title: string;
  price: number;
  images: ImageOwn[];
  quantity: number;
};

export type CartItemsFromServerType = {
  id: number;
  quantity: number;
};

export interface ICartFromServer {
  id: number;
  basketItems: CartItemsFromServerType[];
}
