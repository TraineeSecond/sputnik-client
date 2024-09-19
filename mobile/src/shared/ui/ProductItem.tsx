import React, {memo} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageSourcePropType,
} from 'react-native';
import {StarIcon} from 'shared/icons/Icons';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';

type ProductItemProps = {
  item: {
    id: string;
    title: string;
    brand: string;
    price: number;
    image: ImageSourcePropType;
    priceWithDiscount: number;
  };
  onPress: () => void;
};

export const ProductItem = memo(({item, onPress}: ProductItemProps) => {
  const {id, title, image, price, brand, priceWithDiscount} = item;

  return (
    <TouchableOpacity
      id={id}
      onPress={onPress}
      style={styles.container}
      activeOpacity={1}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.header}>
        {brand && (
          <Text style={TextStyles.span1.changeColor(Colors.Gray500)}>
            {brand}
          </Text>
        )}
        <View style={styles.reviews}>
          <StarIcon
            fill={IconStyles.small.changeColor(Colors.Yellow500).color}
            width={IconStyles.small.width}
            height={IconStyles.small.height}
          />
          <Text style={TextStyles.span1.changeColor(Colors.Black200)}>
            4.9{' '}
          </Text>
          <Text style={TextStyles.span1.changeColor(Colors.Gray500)}>
            (144)
          </Text>
        </View>
      </View>
      <Text
        style={TextStyles.p1.changeColor(Colors.Black200)}
        numberOfLines={1}>
        {title}
      </Text>
      {priceWithDiscount ? (
        <View style={styles.priceContainer}>
          <Text style={TextStyles.p1.changeColor(Colors.Red500)}>
            {`${priceWithDiscount} ₽`}
          </Text>
          <Text
            style={[
              TextStyles.span1.changeColor(Colors.Gray500),
              styles.strikethroughPrice,
            ]}>
            {`${price} ₽`}
          </Text>
        </View>
      ) : (
        <Text style={TextStyles.p1.changeColor(Colors.Black200)}>
          {`${price} ₽`}
        </Text>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 210,
    alignItems: 'flex-start',
    gap: 3,
  },
  imageContainer: {
    width: 210,
    height: 210,
    backgroundColor: Colors.Gray200,
    borderRadius: 10,
  },
  image: {
    width: 210,
    height: 210,
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  reviews: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 12,
    color: 'green',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
  },
  strikethroughPrice: {
    textDecorationLine: 'line-through',
  },
});
