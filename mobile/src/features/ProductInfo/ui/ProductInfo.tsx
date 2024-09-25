import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ProductInfoStyles as styles} from './styles';
import {Product} from 'entities/product';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';
import {HeartFilledIcon, HeartOutlineIcon, StarIcon} from 'shared/icons';
import {useTranslation} from 'react-i18next';

type ProductInfoProps = {
  product: Product;
};

export const ProductInfo = ({product}: ProductInfoProps) => {
  const [isFavorite, setIsFavorite] = useState(false); //временно тут затем из запроса
  const {t} = useTranslation();

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    // добавление в избранное
  };

  const seller = `${product.user.name} ${product.user.surname}`;
  const hasDiscount = product.new_price < product.price;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {product.image ? (
          <Image source={product.image} style={styles.productImage} />
        ) : (
          <Text style={TextStyles.p3.changeColor(Colors.Gray500)}>
            {product.name}
          </Text>
        )}
      </View>
      <View style={styles.main}>
        <View style={styles.header}>
          <View style={styles.topSection}>
            <View style={styles.brandReviews}>
              {product.category && (
                <Text style={TextStyles.p1.changeColor(Colors.Gray500)}>
                  {product.category}
                </Text>
              )}
              {/* TODO: отзывы */}
              {true && (
                <View style={styles.score}>
                  <StarIcon
                    fill={IconStyles.small.changeColor(Colors.Yellow500).color}
                    width={IconStyles.small.width}
                    height={IconStyles.small.height}
                  />
                  <Text style={TextStyles.p1.changeColor(Colors.Black200)}>
                    {5}{' '}
                  </Text>
                  {true && (
                    <Text style={TextStyles.p1.changeColor(Colors.Gray500)}>
                      {`(${23})`}
                    </Text>
                  )}
                </View>
              )}
            </View>
            <TouchableOpacity
              onPress={handleFavoritePress}
              style={styles.favoriteIcon}>
              {isFavorite ? (
                <HeartFilledIcon
                  fill={Colors.Red500}
                  width={IconStyles.large.width}
                  height={IconStyles.large.height}
                />
              ) : (
                <HeartOutlineIcon
                  fill={Colors.Gray500}
                  width={IconStyles.large.width}
                  height={IconStyles.large.height}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.bottomSection}>
            <Text
              style={TextStyles.p3.changeColor(Colors.Black100)}
              numberOfLines={1}>
              {product.name}
            </Text>
            {hasDiscount ? (
              <View style={styles.priceContainer}>
                <Text style={TextStyles.p1.changeColor(Colors.Red500)}>
                  {`${product.new_price} ₽`}
                </Text>
                <Text
                  style={[
                    TextStyles.span1.changeColor(Colors.Gray500),
                    styles.strikethroughPrice,
                  ]}>
                  {`${product.price} ₽`}
                </Text>
              </View>
            ) : (
              <Text style={TextStyles.p1.changeColor(Colors.Black200)}>
                {`${product.price} ₽`}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.description}>
          <Text style={TextStyles.p1.changeColor(Colors.Gray500)}>
            {product.description}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={TextStyles.p1.changeColor(Colors.Black200)}>
              {t('В корзину')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton}>
            <Text style={TextStyles.p1.changeColor(Colors.White100)}>
              {t('Купить сейчас')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
