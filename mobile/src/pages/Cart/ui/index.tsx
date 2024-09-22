import React from 'react';
import {View, Text} from 'react-native';
import {CartPageStyles as styles} from './Cart.styles';
import {CartItem} from 'entities/CartItem';
import {Colors, TextStyles} from 'shared/libs/helpers';
import {useTranslation} from 'react-i18next';

export const Cart = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
    </View>
  );
};
