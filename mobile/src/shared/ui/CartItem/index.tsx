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
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
};

export const CartItem: React.FC<CartItemProps> = ({
  title,
  image,
  price,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
      <Text style={styles.deleteButtonText}>Удалить</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <View style={styles.infoContainer}>
        <Text style={styles.productName} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.productPrice}>{`${price} ₽`}</Text>
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
