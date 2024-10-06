import {create} from 'zustand';
import axios from 'axios';

import {CartItemType} from 'entities/CartItem';
import {Product} from 'entities/product';

export type OrderItem = {
  id: number;
  orderid: number;
  productid: number;
  quantity: number;
  product: Product;
};

export type Order = {
  id: number;
  orderItems: OrderItem[];
};

type OrderStore = {
  isLoading: boolean;
  isOrderItem: boolean;
  orders: Order[];


  setIsLoading: (isLoading: boolean) => void;
  setIsOrderItem: (isOrredItem: boolean) => void;
  makeOrder: (
    items: CartItemType[],
    userid: number,
    token: string,
  ) => Promise<void>;
  getOrders: (userid: number, token: string) => Promise<void>;
};

export const useOrderStore = create<OrderStore>(set => ({
  isLoading: false,
  isOrderItem: false,
  orders: [],

  setIsLoading: (isLoading: boolean) => {
    set({isLoading});
  },

  setIsOrderItem: (isOrderItem: boolean)=> {
    set({isOrderItem});
  },

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
          orders: data.orderitems,
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

      const formattedOrders = data.map((order: any) => {
        return {
          id: order.id,
          orderItems: order.orderitems.map((orderItem: any) => {
            return {
              id: orderItem.id,
              orderid: orderItem.orderid,
              productid: orderItem.productid,
              quantity: orderItem.quantity,
              product: {
                id: orderItem.product.id,
                category: orderItem.product.category,
                description: orderItem.product.description,
                name: orderItem.product.name,
                price: orderItem.product.price,
                new_price: orderItem.product.new_price,
                rating: orderItem.product.rating,
                reviewerscount: orderItem.product.reviewerscount,
                user: {
                  id: order.user.id,
                  email: order.user.email,
                  role: order.user.role,
                  name: order.user.name,
                  surname: order.user.surname,
                },
                image: '',
              },
            };
          }),
        };
      });

      set({
        orders: formattedOrders,
      });
    } catch (error: any) {
      
  }},
}));
