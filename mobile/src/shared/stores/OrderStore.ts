import axios from 'axios';
import {CartItemType, Product} from 'entities';
import {create} from 'zustand';

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
  orders: Order[];
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isProductOrdered: (productId: number) => boolean;
  makeOrder: (
    items: CartItemType[],
    userid: number,
    token: string,
  ) => Promise<void>;
  getOrders: (userid: number, token: string) => Promise<void>;
};

export const useOrderStore = create<OrderStore>((set, get) => ({
  isLoading: false,
  orders: [],

  setIsLoading: (isLoading: boolean) => {
    set({isLoading});
  },

  isProductOrdered: (productId: number) => {
    const orders = get().orders;
    return orders.some(order =>
      order.orderItems.some(orderItem => orderItem.product.id === productId),
    );
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
        console.log('data orderstore:', data);
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
        console.log(order);
        return {
          id: order.id,
          orderItems: order.orderitems.map((orderItem: any) => {
            console.log(orderItem);
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
                images: orderItem.product.images,
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
    } catch (error: any) {}
  },
}));
