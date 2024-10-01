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
