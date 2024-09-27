import {useUserStore} from 'entities/user';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useOrderStore} from 'shared/stores/OrderStore';

export const Orders = () => {
  const {getOrders, orderItems} = useOrderStore();
  const {user, token} = useUserStore();

  useEffect(() => {
    getOrders(user.id, token);
  }, []);

  // Плоский массив orderItems
  const flatOrderItems = orderItems.flat();

  return (
    <View>
      <Text>Заказы</Text>
      {flatOrderItems.map(item => (
        <View key={item.id} style={{marginBottom: 10}}>
          <Text>
            Продукт: {item?.product?.name || 'Название продукта не указано'}
          </Text>
          <Text>Количество: {item.quantity}</Text>
          <Text>Order ID: {item.orderid}</Text>
        </View>
      ))}
    </View>
  );
};
