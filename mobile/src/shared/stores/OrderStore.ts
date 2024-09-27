import {create} from 'zustand';
import axios from 'axios';

import {CartItemType} from 'entities/CartItem';
import {Product} from 'entities/product';

type OrderItem = {
  id: number;
  orderid: number;
  productid: number;
  quantity: number;
  product: Product;
};

type OrderStore = {
  orderItems: OrderItem[];
  makeOrder: (
    items: CartItemType[],
    userid: number,
    token: string,
  ) => Promise<void>;
  getOrders: (userid: number, token: string) => Promise<void>;
};

export const useOrderStore = create<OrderStore>(set => ({
  id: 0,
  orderItems: [],
  makeOrder: async (items: CartItemType[], userid: number, token: string) => {
    try {
      const formattedItems = items.map(item => ({
        quantity: item.quantity,
        productid: item.id,
      }));
      const {data} = await axios.post(
        'https://domennameabcdef.ru/api/orders',
        {
          userid,
          orderItems: formattedItems,
        },
        {
          headers: {
            token,
          },
        },
      );
      if (data?.orderitems) {
        set({
          orderItems: data.orderitems,
        });
      }
    } catch (error: any) {
      console.error(error.response);
    }
  },
  getOrders: async (userid: number, token: string) => {
    try {
      const {data} = await axios.get(
        `https://domennameabcdef.ru/api/orders/${userid}`,
        {
          headers: {
            token: token,
          },
        },
      );

      const formatedItems = data.map((item: any) => {
        if (!item.orderitems[0]) {
          console.error('Нету данных о заказах');
        }
        const orderItems = item.orderitems.map((orderItem: OrderItem) => {
          console.log(orderItem);
          return orderItem;
        });

        return (item = orderItems);
      });

      console.log(formatedItems);

      set({
        orderItems: formatedItems,
      });
    } catch (error: any) {
      console.error(error);
    }
  },
}));
