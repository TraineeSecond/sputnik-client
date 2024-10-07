import React, {memo} from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {RemoveIcon} from 'shared/icons';
import {Colors, TextStyles} from 'shared/libs/helpers';

import {CartItemStyles as styles} from './CartItem.styles';

type CartItemProps = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: ImageSourcePropType;
  onRemove: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  handleNavigate: (productId: number) => void;
};

export const CartItem = memo(
  ({
    id,
    title,
    image,
    price,
    quantity,
    onRemove,
    onDecrement,
    onIncrement,
    handleNavigate,
  }: CartItemProps) => {
    const handleGoToProduct = () => {
      handleNavigate(id);
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleGoToProduct}
          style={styles.itemContent}>
          {image ? (
            <Image style={styles.image} source={image} />
          ) : (
            <Image
              style={styles.image}
              source={require('shared/assets/images/mock/tshirt.png')}
            />
          )}
          <View style={styles.infoContainer}>
            <Text style={styles.productName} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.productPrice}>{price} ₽</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
            <RemoveIcon fill={Colors.Green400} />
          </TouchableOpacity>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={onDecrement}>
              <Text style={TextStyles.span1}>-</Text>
            </TouchableOpacity>
            <Text
              style={[
                TextStyles.span1.changeColor(Colors.Black100),
                styles.counterValue,
              ]}>
              {quantity}
            </Text>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={onIncrement}>
              <Text style={TextStyles.span1}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  },
);
