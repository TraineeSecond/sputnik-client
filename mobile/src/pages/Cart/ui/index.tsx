import React, {useState} from 'react';
import {Alert, FlatList} from 'react-native';
import {CartPageStyles as styles} from './Cart.styles';
import {CartItem} from 'shared/ui';
import {Button} from '@ui-kitten/components';
import {CartItems} from 'shared/assets/mockData';
import {CartItemType} from 'entities/CartItem';

export const Cart = () => {
  const [cartItems, setCartItems] = useState(CartItems);

  const handleIncrement = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  };

  const handleDecrement = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    );
  };

  const handleBuy = () => {
    Alert.alert('Заказ успешно оформлен');
    setCartItems([]);
  };

  const renderCartItem = ({item}: {item: CartItemType}) => (
    <CartItem
      id={item.id}
      title={item.title}
      image={item.image}
      price={item.price}
      quantity={item.quantity}
      onIncrement={() => handleIncrement(item.id)}
      onDecrement={() => handleDecrement(item.id)}
    />
  );

  return (
    <>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={renderCartItem}
        contentContainerStyle={{paddingBottom: 60}}
      />
      <Button status="success" onPress={handleBuy} style={styles.button}>
        Checkout
      </Button>
    </>
  );
};
