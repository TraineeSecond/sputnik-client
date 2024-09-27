import {create} from 'zustand';
import axios from 'axios';

import {CartItemType, ICartFromServer} from 'entities/CartItem';
import {storage} from 'shared/libs/storage';
import {Product} from 'entities/product';
type OrderItem = {
  id: number;
  productid: number;
  quantity: number;
  product?: Product; // Связь с продуктом
};

type Order = {
  id: number;
  userid: number;
  status: string;
  orderitems: OrderItem[];
};

type OrderStore = {
  orderItems: any[];
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
      console.log(data);
      console.log('123', data.orderitems);
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
          // params: {
          //   userid,
          // },
          headers: {
            token: token,
          },
        },
      );
      // console.log(data);
      console.log(data);

      console.log('data[0].orderitems', data[0].orderitems[0].id);

      // const formattedData = data.map(dataItem=> ())

      // if (data?.orderitems) {
      //   console.log(data.orderitems);
      //   set({
      //     orderItems: data.orderitems,
      //   });
      // }
    } catch (error: any) {
      console.error(error);
    }
  },
}));
