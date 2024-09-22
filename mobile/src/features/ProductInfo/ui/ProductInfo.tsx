import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ProductInfoStyles as styles} from './styles';
import {Product} from 'entities/product';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';
import {HeartFilledIcon, HeartOutlineIcon, StarIcon} from 'shared/icons';

type ProductInfoProps = {
  product: Product;
};

export const ProductInfo = ({product}: ProductInfoProps) => {
  const [isFavorite, setIsFavorite] = useState(false); //временно тут затем из запроса

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    // добавление в избранное
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={product.image} style={styles.productImage} />
      </View>
      <View style={styles.main}>
        <View style={styles.header}>
          <View style={styles.topSection}>
            <View style={styles.brandReviews}>
              {product.brand && (
                <Text style={TextStyles.p1.changeColor(Colors.Gray500)}>
                  {product.brand}
                </Text>
              )}
              {product.totalScore && (
                <View style={styles.score}>
                  <StarIcon
                    fill={IconStyles.small.changeColor(Colors.Yellow500).color}
                    width={IconStyles.small.width}
                    height={IconStyles.small.height}
                  />
                  <Text style={TextStyles.p1.changeColor(Colors.Black200)}>
                    {product.totalScore}{' '}
                  </Text>
                  {product.reviewsCount && (
                    <Text style={TextStyles.p1.changeColor(Colors.Gray500)}>
                      {`(${product.reviewsCount})`}
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
              {product.title}
            </Text>
            {product.priceWithDiscount ? (
              <View style={styles.priceContainer}>
                <Text style={TextStyles.p1.changeColor(Colors.Red500)}>
                  {`${product.priceWithDiscount} ₽`}
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
              В корзину
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton}>
            <Text style={TextStyles.p1.changeColor(Colors.White100)}>
              Купить сейчас
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
