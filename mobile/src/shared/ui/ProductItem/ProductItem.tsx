import React, {memo, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';
import {ProductItemStyles as styles} from './ProductItem.styles';
import {HeartFilledIcon, HeartOutlineIcon, StarIcon} from 'shared/icons';

type ProductItemProps = {
  id: string;
  name: string;
  image?: ImageSourcePropType;
  price: number;
  newPrice: number;
  sellerName: string;
  sellerSurname: string;
  style?: object;
  onPress: () => void;
};

export const ProductItem = memo(
  ({
    id,
    name,
    image,
    price,
    newPrice,
    sellerName,
    sellerSurname,
    style,
    onPress,
  }: ProductItemProps) => {
    const [isFavorite, setIsFavorite] = useState(false); //временно тут затем из запроса

    const handleFavoritePress = () => {
      setIsFavorite(!isFavorite);
      // добавление в избранное
    };

    const seller = `${sellerName} ${sellerSurname}`;
    const hasDiscount = newPrice < price;

    const renderFavoriteIcon = () => {
      return isFavorite ? (
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
      );
    };

    const renderImageOrName = () => {
      if (image) return <Image source={image} />;
      return (
        <Text style={TextStyles.p1.changeColor(Colors.Gray500)}>{name}</Text>
      );
    };

    const renderPrice = () => {
      if (hasDiscount) {
        return (
          <View style={styles.priceContainer}>
            <Text style={TextStyles.p1.changeColor(Colors.Red500)}>
              {`${newPrice} ₽`}
            </Text>
            <Text
              style={[
                TextStyles.span1.changeColor(Colors.Gray500),
                styles.strikethroughPrice,
              ]}>
              {`${price} ₽`}
            </Text>
          </View>
        );
      }
      return (
        <Text style={TextStyles.p1.changeColor(Colors.Black200)}>
          {`${price} ₽`}
        </Text>
      );
    };

    //TODO: Отзывы
    const renderReviews = () => {
      const score = 5;
      const reviewsCount = 23;

      return (
        <View style={styles.reviews}>
          <StarIcon
            fill={IconStyles.small.changeColor(Colors.Yellow500).color}
            width={IconStyles.small.width}
            height={IconStyles.small.height}
          />
          <Text style={TextStyles.span1.changeColor(Colors.Black200)}>
            {score}{' '}
          </Text>
          <Text style={TextStyles.span1.changeColor(Colors.Gray500)}>
            {`(${reviewsCount})`}
          </Text>
        </View>
      );
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, style]}
        activeOpacity={0.8}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={handleFavoritePress}
            style={styles.favoriteIcon}>
            {renderFavoriteIcon()}
          </TouchableOpacity>
          {renderImageOrName()}
        </View>
        <View style={styles.header}>
          <Text style={TextStyles.span1.changeColor(Colors.Gray500)}>
            {seller}
          </Text>
          {renderReviews()}
        </View>
        <Text
          style={TextStyles.p1.changeColor(Colors.Black200)}
          numberOfLines={1}>
          {name}
        </Text>
        {renderPrice()}
      </TouchableOpacity>
    );
  },
);
