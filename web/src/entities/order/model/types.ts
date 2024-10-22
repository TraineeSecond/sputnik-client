import { CartItemType } from 'entities/cart/model/types';
import { Point } from 'entities/points/model/types';
import { Product } from 'entities/product/model/types';
import { User } from 'shared/auth/model/types';

export interface OrderItem {
  quantity: number;
  product: Product;
}

export interface Order {
  id: number;
  userid: number;
  createdat: string;
  status: string;
  pointid: number | null;
  point: Point | null;
  datestring: string | null;
  orderitems: OrderItem[];
  user: User;
}

export interface OrdersState {
  orders: Order[];
  addOrder: (
    cart: CartItemType[],
    pointid: number | null,
    datestring: string | null,
  ) => Promise<void>;
  loadOrders: () => Promise<void>;
}

export type OrdersResponse = Order[];
