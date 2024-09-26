import {ImageSourcePropType} from 'react-native';

export type CartItemType = {
  id: number;
  title: string;
  price: number;
  image: ImageSourcePropType;
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
