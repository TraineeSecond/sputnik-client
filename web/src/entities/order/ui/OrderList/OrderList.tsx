import { useEffect } from 'react';

import { useOrderStore } from 'entities/order/model/orderStore';

import Order from '../Order/Order';
import { StyledList } from './OrderList.style';

const OrderList = () => {
  const { loadOrders, orders } = useOrderStore();

  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

  return (
    <StyledList>
      {orders.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </StyledList>
  );
};

export default OrderList;
