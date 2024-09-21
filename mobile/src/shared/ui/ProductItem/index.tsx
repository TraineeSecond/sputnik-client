import React, {memo, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import {HeartFilledIcon, HeartOutlineIcon, StarIcon} from 'shared/icons';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';
import {ProductItemStyles as styles} from './ProductItem.styles';

type ProductItemProps = {
  id: string;
  title: string;
  image: ImageSourcePropType;
  price: number;
  brand?: string;
  priceWithDiscount?: number;
  totalScore?: number;
  reviewsCount?: number;
  onPress: () => void;
};

export const ProductItem = memo(
  ({
    id,
    title,
    image,
    price,
    brand,
    priceWithDiscount,
    totalScore,
    reviewsCount,
    onPress,
  }: ProductItemProps) => {
    const [isFavorite, setIsFavorite] = useState(false); //временно тут затем из запроса

    const handleFavoritePress = () => {
      setIsFavorite(!isFavorite);
      // добавление в избранное
    };

    return (
      <TouchableOpacity
        id={id}
        onPress={onPress}
        style={styles.container}
        activeOpacity={1}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={handleFavoritePress}
            style={styles.favoriteIcon}>
            {isFavorite ? (
              <HeartFilledIcon
                fill={Colors.Red500}
                width={IconStyles.medium.width}
                height={IconStyles.medium.height}
              />
            ) : (
              <HeartOutlineIcon
                fill={Colors.Gray500}
                width={IconStyles.medium.width}
                height={IconStyles.medium.height}
              />
            )}
          </TouchableOpacity>
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
  },
);
