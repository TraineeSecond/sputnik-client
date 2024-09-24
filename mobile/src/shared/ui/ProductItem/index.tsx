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
  name: string;
  image?: ImageSourcePropType;
  price: number;
  newPrice: number;
  sellerName: string;
  sellerSurname: string;
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
    onPress,
  }: ProductItemProps) => {
    const [isFavorite, setIsFavorite] = useState(false); //временно тут затем из запроса

    const handleFavoritePress = () => {
      setIsFavorite(!isFavorite);
      // добавление в избранное
    };

    const seller = `${sellerName} ${sellerSurname}`;
    const hasDiscount = newPrice < price;

    //TODO: Отзывы, картинка

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
          {image ? (
            <Image source={image} style={styles.image} />
          ) : (
            <Text style={TextStyles.p1.changeColor(Colors.Gray500)}>
              {name}
            </Text>
          )}
        </View>
        <View style={styles.header}>
          <Text style={TextStyles.span1.changeColor(Colors.Gray500)}>
            {seller}
          </Text>
          {/* Отзывы мок */}
          {true && (
            <View style={styles.reviews}>
              <StarIcon
                fill={IconStyles.small.changeColor(Colors.Yellow500).color}
                width={IconStyles.small.width}
                height={IconStyles.small.height}
              />
              <Text style={TextStyles.span1.changeColor(Colors.Black200)}>
                {5}{' '}
              </Text>
              {true && (
                <Text style={TextStyles.span1.changeColor(Colors.Gray500)}>
                  {`(${23})`}
                </Text>
              )}
            </View>
          )}
        </View>
        <Text
          style={TextStyles.p1.changeColor(Colors.Black200)}
          numberOfLines={1}>
          {name}
        </Text>
        {hasDiscount ? (
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
        ) : (
          <Text style={TextStyles.p1.changeColor(Colors.Black200)}>
            {`${price} ₽`}
          </Text>
        )}
      </TouchableOpacity>
    );
  },
);
