import { CartItemType } from 'entities/cart/model/types';
import { IPoint } from 'entities/points/model/types';
import { IProduct } from 'entities/product/model/types';
import { IUser } from 'shared/auth/model/types';

export interface IOrderItem {
  quantity: number;
  product: IProduct;
}

export interface IOrder {
  id: number;
  userid: number;
  createdat: string;
  status: string;
  pointid: number | null;
  point: IPoint | null;
  datestring: string | null;
  orderitems: IOrderItem[];
  user: IUser;
}

export interface IOrdersState {
  orders: IOrder[];
  addOrder: (
    cart: CartItemType[],
    pointid: number | null,
    datestring: string | null,
  ) => Promise<void>;
  loadOrders: () => Promise<void>;
}

export type TOrdersResponse = IOrder[];
