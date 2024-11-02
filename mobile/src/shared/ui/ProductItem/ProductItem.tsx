import React, {memo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';

import {Screens, Stacks} from 'app/navigation/navigationEnums';
import {ImageOwn} from 'entities/product';
import {
  AlertIcon,
  HeartFilledIcon,
  HeartOutlineIcon,
  StarIcon,
} from 'shared/icons';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';

import {ProductItemStyles as styles} from './ProductItem.styles';

type ProductItemProps = {
  id: string;
  name: string;
  images: ImageOwn[];
  price: number;
  newPrice: number;
  sellerName: string;
  sellerSurname: string;
  hideButton?: boolean;
  rating: number;
  reviewerscount: number;
  style?: object;
  apellationButton?: boolean;
  sellerId?: number;
  onPress: () => void;
};

export const ProductItem = memo(
  ({
    id,
    name,
    style,
    price,
    images,
    rating,
    newPrice,
    hideButton = false,
    sellerName,
    sellerSurname,
    reviewerscount,
    onPress,
    apellationButton,
    sellerId,
  }: ProductItemProps) => {
    const navigation = useAppNavigation();
    console.log('productId', id);
    const [isFavorite, setIsFavorite] = useState(false); //временно тут затем из запроса
    const {t} = useTranslation();

    const handleFavoritePress = () => {
      setIsFavorite(!isFavorite);
      // добавление в избранное
    };

    const hasDiscount = newPrice < price;

    const seller = `${sellerName} ${sellerSurname}`;

    const accessibilityProduct =
      t('Товар') +
      `: ${name}. ` +
      t('Цена') +
      `: ${price}. ` +
      t('Рейтинг') +
      `: ${rating} ` +
      t('из 5') +
      `. ` +
      t('Отзывов') +
      `: ${reviewerscount}`;

    const accessabilityLikeButton = t(
      isFavorite ? 'Удалить из избранного' : 'Добавить в избранное',
    );

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
      if (!!images.length && images[0].image) {
        return (
          <Image
            source={{uri: images[0].image as string}}
            style={styles.image}
            resizeMode="cover"
          />
        );
      }
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

    const renderReviews = () => {
      return (
        <View style={styles.reviews}>
          <StarIcon
            fill={IconStyles.small.changeColor(Colors.Yellow500).color}
            width={IconStyles.small.width}
            height={IconStyles.small.height}
          />
          <Text style={TextStyles.span1.changeColor(Colors.Black200)}>
            {rating}{' '}
          </Text>
          <Text style={TextStyles.span1.changeColor(Colors.Gray500)}>
            {`(${reviewerscount})`}
          </Text>
        </View>
      );
    };

    const handleAppelRedirect = () => {
      console.log(id, sellerId);

      const image = images && (images[0]?.image as string);
      navigation.navigate(Stacks.MAIN, {
        screen: Screens.PROFILE_TAB,
        params: {
          screen: Screens.APPEALS,
          params: {
            isSeller: false,
            product: {id, sellerId, name, image, price},
          },
        },
      });
    };

    const handleAppelPress = () => {
      Alert.alert(
        `Апелляция на товар ${name}`,
        'Вы будете перенаправлены на страницу с апелляциями для заполнения формы',
        [
          {text: 'Отмена', style: 'cancel'},
          {text: 'Перейти', onPress: handleAppelRedirect},
        ],
      );
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        accessible={true}
        accessibilityLabel={accessibilityProduct}
        accessibilityRole="button"
        style={[styles.container, style]}
        activeOpacity={0.8}>
        <View style={styles.imageContainer}>
          {!hideButton && (
            <TouchableOpacity
              accessible={true}
              accessibilityLabel={accessabilityLikeButton}
              accessibilityRole="button"
              onPress={handleFavoritePress}
              style={styles.favoriteIcon}>
              {renderFavoriteIcon()}
            </TouchableOpacity>
          )}
          {renderImageOrName()}
        </View>
        <View style={styles.header}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[TextStyles.span1.changeColor(Colors.Gray500), styles.name]}>
            {seller}
          </Text>
          {renderReviews()}
        </View>
        <Text
          style={TextStyles.p1.changeColor(Colors.Black200)}
          numberOfLines={1}
          ellipsizeMode="tail">
          {name}
        </Text>
        {renderPrice()}
        {apellationButton && (
          <TouchableOpacity
            onPress={handleAppelPress}
            style={styles.alertButton}>
            <AlertIcon
              fill={Colors.Red500}
              width={IconStyles.medium.width}
              height={IconStyles.medium.height}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  },
);
