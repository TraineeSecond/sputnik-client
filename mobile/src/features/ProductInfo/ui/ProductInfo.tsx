import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {CartItemType} from 'entities/cartItem';
import {Product} from 'entities/product';
import {useUserStore} from 'entities/user';
import {HeartFilledIcon, HeartOutlineIcon, StarIcon} from 'shared/icons';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {useCartStore} from 'shared/stores/CartStore';
import {useOrderStore} from 'shared/stores/OrderStore';
import {useReviewStore} from 'shared/stores/ReviewStore';

import {ProductInfoStyles as styles} from './ProductInfo.styles';

type ProductInfoProps = {
  product: Product;
};

export const ProductInfo = ({product}: ProductInfoProps) => {
  const [isFavorite, setIsFavorite] = useState(false); //временно тут затем из запроса
  const {t} = useTranslation();
  const navigation = useAppNavigation();

  const {orders, isOrderItem, setIsOrderItem} = useOrderStore();
  const {
    userRating,
    setUserRating,
    makeReview,
    setHasReview,
    hasReview,
    putReview,
    getReview,
    reviews,
  } = useReviewStore();

  const {
    items,
    addItem,
    removeItem,
    incrementItem,
    decrementItem,
    getItemQuantity,
  } = useCartStore();
  const {token, user} = useUserStore();

  const hideButton = user.role === 'seller';

  useEffect(() => {
    const orderItemExists = orders.some(order =>
      order.orderItems.some(orderItem => orderItem.product.id === product.id),
    );
    setIsOrderItem(orderItemExists);
    getReview(product.id, user.id);
  }, [orders, product.id]);

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    // добавление в избранное
  };

  const seller = `${product.user.name} ${product.user.surname}`;
  const hasDiscount = product.new_price < product.price;

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.name,
      image: product.image,
      price: product.new_price || product.price,
      quantity: 1,
    } as CartItemType;
    addItem(cartItem, token, user.id);
  };

  const handleGoToCart = () => {
    navigation.navigate(Screens.CART);
  };

  const quantity = useMemo(() => getItemQuantity(product.id), [items]);

  const handleIncrementItem = () => {
    incrementItem(product.id, token, user.id);
  };

  const handleDecrementItem = () => {
    if (quantity === 1) {
      removeItem(product.id, token, user.id);
      return;
    }
    decrementItem(product.id, token, user.id);
  };

  const isCartItem = () => {
    return items.some(item => item.id === product.id);
  };

  const renderImage = () => {
    if (product.image) {
      <Image source={product.image} style={styles.productImage} />;
    }
    return (
      <Text style={TextStyles.p3.changeColor(Colors.Gray500)}>
        {product.name}
      </Text>
    );
  };

  const renderFavoriteIcon = () => {
    return isFavorite ? (
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
    );
  };

  const renderPrice = () => {
    if (hasDiscount) {
      return (
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
      );
    }
    return (
      <Text style={TextStyles.p1.changeColor(Colors.Black200)}>
        {`${product.price} ₽`}
      </Text>
    );
  };

  //TODO: Отзывы если они будут добавлены
  const renderScore = () => {
    return (
      <View style={styles.score}>
        <StarIcon
          fill={IconStyles.small.changeColor(Colors.Yellow500).color}
          width={IconStyles.small.width}
          height={IconStyles.small.height}
        />
        <Text style={TextStyles.p1.changeColor(Colors.Black200)}>
          {product.rating}{' '}
        </Text>
        <Text style={TextStyles.p1.changeColor(Colors.Gray500)}>
          {`(${product.reviewerscount})`}
        </Text>
      </View>
    );
  };

  const handleReviewMake = () => {
    makeReview(user.id, product.id, userRating);
    Alert.alert(t('Спасибо за отзыв!'));
  };

  const handleReviewChange = () => {
    putReview(user.id, product.id, userRating);
    Alert.alert(t('Спасибо за отзыв!'));
  };

  const handleStarPress = (rating: number) => {
    setUserRating(rating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const handleOnPress = () => handleStarPress(i);
      stars.push(
        <TouchableOpacity key={i} onPress={handleOnPress}>
          <StarIcon
            fill={i <= userRating ? Colors.Yellow500 : Colors.Gray500}
            width={50}
            height={50}
          />
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  const renderReviewMake = () => {
    return (
      <View style={styles.reviewContainer}>
        <Text style={TextStyles.p1.changeColor(Colors.Black200)}>
          {hasReview ? t('Изменить оценку') : t('Оцените товар')}
        </Text>
        <View style={styles.starsContainer}>{renderStars()}</View>
        <View>
          <TouchableOpacity
            onPress={hasReview ? handleReviewChange : handleReviewMake}>
            <Text style={TextStyles.p1.changeColor(Colors.Black200)}>
              {t('Отправить')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>{renderImage()}</View>
      <View style={styles.main}>
        <View style={styles.header}>
          <View style={styles.topSection}>
            <View style={styles.brandReviews}>
              <Text
                style={TextStyles.p2.changeColor(Colors.Gray500)}
                ellipsizeMode="tail">
                {product.category}
              </Text>
              {renderScore()}
              <Text style={TextStyles.p2.changeColor(Colors.Gray500)}>
                {seller}
              </Text>
            </View>
            {!hideButton && (
              <TouchableOpacity
                onPress={handleFavoritePress}
                style={styles.favoriteIcon}>
                {renderFavoriteIcon()}
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.bottomSection}>
            <Text
              style={TextStyles.p3.changeColor(Colors.Black100)}
              numberOfLines={1}>
              {product.name}
            </Text>
            {renderPrice()}
          </View>
        </View>
        <View style={styles.description}>
          <Text style={TextStyles.p1.changeColor(Colors.Gray500)}>
            {product.description}
          </Text>
        </View>
        <View>{isOrderItem && renderReviewMake()}</View>
        {!hideButton && (
          <View style={styles.buttonsContainer}>
            {isCartItem() ? (
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleGoToCart}>
                  <Text style={TextStyles.p1.changeColor(Colors.White100)}>
                    {t('В корзине')}
                  </Text>
                </TouchableOpacity>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={handleDecrementItem}>
                    <Text style={TextStyles.p1.changeColor(Colors.White100)}>
                      -
                    </Text>
                  </TouchableOpacity>
                  <Text style={TextStyles.p1.changeColor(Colors.White100)}>
                    {quantity}
                  </Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={handleIncrementItem}>
                    <Text style={TextStyles.p1.changeColor(Colors.White100)}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity onPress={handleAddToCart} style={styles.button}>
                <Text style={TextStyles.p1.changeColor(Colors.White100)}>
                  {t('В корзину')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};
