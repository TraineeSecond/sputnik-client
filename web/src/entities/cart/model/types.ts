import { Product } from 'entities/product/model/types';

export type CartItemType = {
  productid: number;
  quantity: number;
};

export type CartResponse = {
  message: string;
  basket: {
    id: number;
    basketItems: CartItemType[];
  };
};

export type CartDetails = Record<number, Product>;
