import React, {useEffect} from 'react';
import {FlatList, Alert, View, ScrollView} from 'react-native';
import {Button} from '@ui-kitten/components';
import {useCartStore} from '../model/store';
import {CartItem} from 'shared/ui';
import {CartPageStyles as styles} from './Cart.styles';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamsList} from 'app/navigation/navigationTypes';
import {Screens} from 'app/navigation/navigationEnums';

type CartRouteProp = RouteProp<RootStackParamsList, Screens.CART>;

export const Cart = () => {
  const {items, setItems, incrementItem, decrementItem, clearCart, removeItem} =
    useCartStore();
  const route = useRoute<CartRouteProp>();

  const Data = route.params.data;

  useEffect(() => {
    setItems(Data);

    return () => {
      setItems([]);
      console.log('Unmounted');
    };
  }, [Data]);

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Корзина пуста');
      return;
    }
    Alert.alert('Заказ успешно оформлен');
    clearCart();
  };

  return (
    <View>
      <ScrollView contentContainerStyle={{paddingBottom: 60}}>
        {items.map(item => {
          const handleIncrement = () => incrementItem(item.id);
          const handleDecrement = () => decrementItem(item.id);
          const handleRemove = () => removeItem(item.id);

          return (
            <CartItem
              key={item.id}
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
        })}
      </ScrollView>
      {/* <FlatList
        data={cartItems}
        keyExtractor={item => `${item.title}-${item.id}`}
        contentContainerStyle={{paddingBottom: 60}}
        initialNumToRender={5}
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
      /> */}
      <Button style={styles.button} status="success" onPress={handleCheckout}>
        Оформить заказ
      </Button>
    </View>
  );
};
