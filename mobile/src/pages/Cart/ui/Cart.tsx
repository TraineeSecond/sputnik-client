import React from 'react';
import {Text, View} from 'react-native';

import {CartPageStyles as styles} from './Cart.styles';

export const Cart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cart</Text>
    </View>
  );
};
