import React, {memo} from 'react';
import {Product} from 'entities/product';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {StarIcon} from 'shared/icons/Icons';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';
import {ProductItemStyles as styles} from './ProductItem.styles';

type ProductItemProps = {
  item: Product;
  onPress: () => void;
};

export const ProductItem = memo(({item, onPress}: ProductItemProps) => {
  const {
    id,
    title,
    image,
    price,
    brand,
    priceWithDiscount,
    totalScore,
    reviewsCount,
  } = item;

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
        {totalScore && (
          <View style={styles.reviews}>
            <StarIcon
              fill={IconStyles.small.changeColor(Colors.Yellow500).color}
              width={IconStyles.small.width}
              height={IconStyles.small.height}
            />
            <Text style={TextStyles.span1.changeColor(Colors.Black200)}>
              {totalScore}{' '}
            </Text>
            {reviewsCount && (
              <Text style={TextStyles.span1.changeColor(Colors.Gray500)}>
                {`(${reviewsCount})`}
              </Text>
            )}
          </View>
        )}
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
