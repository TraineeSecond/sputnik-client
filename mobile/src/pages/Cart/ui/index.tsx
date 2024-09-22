import React from 'react';
import {FlatList, Alert} from 'react-native';
import {Button} from '@ui-kitten/components';
import {useCartStore} from '../model/store';
import {CartItem} from 'shared/ui';
import {CartPageStyles as styles} from './Cart.styles';

export const Cart = () => {
  const {items, incrementItem, decrementItem, clearCart, removeItem} =
    useCartStore();

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Корзина пуста');
      return;
    }
    Alert.alert('Заказ успешно оформлен');
    clearCart();
  };

  return (
    <>
      <FlatList
        data={items}
        renderItem={({item}) => {
          const handleIncrement = () => incrementItem(item.id);
          const handleDecrement = () => decrementItem(item.id);
          const handleRemove = () => removeItem(item.id);
          return (
            <CartItem
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              quantity={item.quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleRemove}
            />
          );
        }}
        contentContainerStyle={{paddingBottom: 60}}
      />
      <Button style={styles.button} status="success" onPress={handleCheckout}>
        Оформить заказ
      </Button>
    </>
  );
};
