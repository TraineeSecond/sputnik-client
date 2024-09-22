import React from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import {CartItemStyles as styles} from './CartItem.styles';
import {Colors, TextStyles} from 'shared/libs/helpers';

type CartItemProps = {
  id: string;
  title: string;
  image: ImageSourcePropType;
  price: number;
  onIncrement: () => void;
  onDecrement: () => void;
  quantity: number;
};

export const CartItem: React.FC<CartItemProps> = ({
  title,
  image,
  price,
  onIncrement,
  onDecrement,
  quantity,
}) => {
  return (
    <View style={styles.container}>
      <Image width={85} height={85} style={styles.image} source={image} />
      <View style={styles.infoContainer}>
        <Text
          style={[
            TextStyles.p1.changeColor(Colors.Black200),
            styles.productName,
          ]}
          numberOfLines={1}>
          {title}
        </Text>
        <Text
          style={[
            TextStyles.p1.changeColor(Colors.Black100),
            styles.productPrice,
          ]}>
          ${price.toFixed(2)}
        </Text>
      </View>

      <View style={styles.counterContainer}>
        <TouchableOpacity style={styles.counterButton} onPress={onDecrement}>
          <Text style={TextStyles.span1}>-</Text>
        </TouchableOpacity>
        <Text
          style={[
            TextStyles.span1.changeColor(Colors.Black100),
            styles.counterValue,
          ]}>
          {quantity}
        </Text>
        <TouchableOpacity style={styles.counterButton} onPress={onIncrement}>
          <Text style={TextStyles.span1}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
