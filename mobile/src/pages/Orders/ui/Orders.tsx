import {useUserStore} from 'entities/user';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useOrderStore} from 'shared/stores/OrderStore';

export const Orders = () => {
  const {getOrders} = useOrderStore();

  const {user, token} = useUserStore();

  useEffect(() => {
    getOrders(user.id, token);
  }, []);
  return (
    <View>
      <Text>Заказы</Text>
    </View>
  );
};
