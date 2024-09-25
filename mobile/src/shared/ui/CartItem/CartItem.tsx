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
import {RemoveIcon} from 'shared/icons';

type CartItemProps = {
  id: number;
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
  console.log(image);
  return (
    <View style={styles.container}>
      {image ? (
        <Image style={styles.image} source={image} />
      ) : (
        <Image
          width={85}
          height={85}
          style={styles.image}
          source={require('shared/images/mock/tshirt.png')}
        />
      )}
      <Image style={styles.image} source={image} />
      <View style={styles.infoContainer}>
        <Text style={styles.productName} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.productPrice}>{`${price} ₽`}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
        <RemoveIcon fill={Colors.Green400} />
      </TouchableOpacity>
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
