import React from 'react';
import {View, Text} from 'react-native';
import {CartPageStyles as styles} from './Cart.styles';

const Cart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cart</Text>
    </View>
  );
};

export default Cart;
