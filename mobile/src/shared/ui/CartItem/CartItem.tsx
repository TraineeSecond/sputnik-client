import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {ImageOwn} from 'entities/product';
import {RemoveIcon} from 'shared/icons';
import {Colors, TextStyles} from 'shared/libs/helpers';

import {CartItemStyles as styles} from './CartItem.styles';

type CartItemProps = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  images: ImageOwn[];
  onRemove: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  handleNavigate: (productId: number) => void;
};

export const CartItem = memo(
  ({
    id,
    title,
    images,
    price,
    quantity,
    onRemove,
    onDecrement,
    onIncrement,
    handleNavigate,
  }: CartItemProps) => {
    const {t} = useTranslation();

    const handleGoToProduct = () => {
      handleNavigate(id);
    };

    return (
      <View
        style={styles.container}
        accessible={true}
        accessibilityLabel={`${t('Товар')}: ${title}, ${t(
          'Количество',
        )}: ${quantity}, ${t('Цена')}: ${price}`}>
        <TouchableOpacity
          onPress={handleGoToProduct}
          style={styles.itemContent}
          accessible={true}
          accessibilityLabel={t('Перейти к товару')}>
          {images && images[0]?.image ? (
            <Image
              source={{uri: images[0].image as string}}
              style={styles.image}
            />
          ) : (
            <View style={styles.noImage}>
              <Text style={TextStyles.span1.changeColor(Colors.Gray500)}>
                {title}
              </Text>
            </View>
          )}
          <View style={styles.infoContainer}>
            <Text style={styles.productName} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.productPrice}>{price} ₽</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={onRemove}
            accessible={true}
            accessibilityLabel={t('Удалить товар из корзины')}>
            <RemoveIcon fill={Colors.Green400} />
          </TouchableOpacity>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={onDecrement}
              accessible={true}
              accessibilityLabel={t('Уменьшить количество')}>
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
              onPress={onIncrement}
              accessible={true}
              accessibilityLabel={t('Увеличить количество')}>
              <Text style={TextStyles.span1}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  },
);
