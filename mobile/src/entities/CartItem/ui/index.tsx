import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {CartItemStyles as styles} from './CartItem.styles';
import {Colors, TextStyles} from 'shared/libs/helpers';

export const CartItem = () => {
  return (
    <View style={styles.container}>
      <Image
        width={85}
        height={85}
        style={styles.image}
        source={require('shared/assets/images/testCartItemImage.png')}
      />

      <View style={styles.infoContainer}>
        <Text
          style={[
            TextStyles.p1.changeColor(Colors.Black200),
            styles.productName,
          ]}>
          Макбук аир про супер дупер
        </Text>

        <Text
          style={[
            TextStyles.p1.changeColor(Colors.Black100),
            styles.productPrice,
          ]}>
          $899.99
        </Text>
      </View>

      <View style={styles.counterContainer}>
        <TouchableOpacity style={styles.counterButton}>
          <Text style={styles.counterText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>1</Text>
        <TouchableOpacity style={styles.counterButton}>
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
