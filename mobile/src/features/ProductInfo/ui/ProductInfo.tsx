import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Button} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, Text, TouchableOpacity, View} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {ProfileStackParamsList} from 'app/navigation/navigationTypes';
import {CartItemType, Product} from 'entities';
import {useUserStore} from 'entities/user';
import {useChatListStore} from 'features/ChatList';
import {HeartFilledIcon, HeartOutlineIcon, StarIcon} from 'shared/icons';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {useCartStore} from 'shared/stores/CartStore';
import {useOrderStore} from 'shared/stores/OrderStore';
import {useReviewStore} from 'shared/stores/ReviewStore';
import {Carousel} from 'shared/ui';

import {ProductInfoStyles as styles} from './ProductInfo.styles';

type ProductInfoProps = {
  product: Product;
};

export const ProductInfo = ({product}: ProductInfoProps) => {
  const [isFavorite, setIsFavorite] = useState(false); //временно тут затем из запроса
  const {t} = useTranslation();
  const navigation = useAppNavigation();

  const {orders, isProductOrdered} = useOrderStore();
  const {
    hasReview,
    userRating,
    getReview,
    putReview,
    makeReview,
    setUserRating,
  } = useReviewStore();

  const {
    items,
    addItem,
    removeItem,
    incrementItem,
    decrementItem,
    getItemQuantity,
  } = useCartStore();

  const {addChat} = useChatListStore();

  const {token, user} = useUserStore();

  const hideButton = user.role === 'seller';
  const isAuthor = user.id === product.user.id;

  useEffect(() => {
    getReview(product.id, user.id);
  }, [orders, product.id]);

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    // добавление в избранное
  };

  const seller = `${product.user.name} ${product.user.surname}`;
  const hasDiscount = product.new_price < product.price;
  const isOrderItem = isProductOrdered(product.id);
  const quantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.name,
      images: product.images,
      price: product.new_price || product.price,
      quantity: 1,
    } as CartItemType;
    addItem(cartItem, token, user.id);
  };

  const handleGoToCart = () => {
    navigation.navigate(Screens.CART);
  };

  const handleGoToChat = async () => {
    const newChat = await addChat(product.id, [product.user.id, user.id]);
    if (newChat) {
      const chatId = newChat.id;
      navigation.navigate(Screens.MESSENGER, {chatId});
    }
  };

  const handleIncrementItem = () => {
    incrementItem(product.id, token, user.id);
  };

  const handleDecrementItem = () => {
    if (quantity === 1) {
      removeItem(product.id, token, user.id);
    } else {
      decrementItem(product.id, token, user.id);
    }
  };

  const isCartItem = () => {
    return items.some(item => item.id === product.id);
  };

  const renderImage = () => {
    return (
      <View style={styles.imageContainer}>
        {!!product.images.length ? (
          <Carousel images={product.images} />
        ) : (
          <Text style={TextStyles.p3.changeColor(Colors.Gray500)}>
            {product.name}
          </Text>
        )}
      </View>
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

  const handleEditProduct = () => {
    navigation.navigate(Screens.NEWPRODUCT, {product});
  };

  const renderActionButton = () => {
    if (isAuthor) {
      return (
        <Button
          onPress={handleEditProduct}
          status="primary"
          style={styles.buttonRedirect}>
          <Text>{t('Редактировать')}</Text>
        </Button>
      );
    } else if (!hideButton) {
      return (
        <Button
          onPress={handleGoToChat}
          status="warning"
          style={styles.buttonRedirect}>
          <Text>{t('Перейти в чат')}</Text>
        </Button>
      );
    } else {
      return null;
    }
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
                style={[TextStyles.p2.changeColor(Colors.Gray500)]}
                ellipsizeMode="tail">
                {product.category}
              </Text>
              {renderScore()}
              <Text
                style={[
                  TextStyles.p2.changeColor(Colors.Gray500),
                  styles.shrink,
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
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
        {renderActionButton()}
      </View>
    </View>
  );
};
