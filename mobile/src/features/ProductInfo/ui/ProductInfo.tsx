import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {CartItemType} from 'entities/CartItem';
import {Product} from 'entities/product';
import {useUserStore} from 'entities/user';
import {HeartFilledIcon, HeartOutlineIcon, StarIcon} from 'shared/icons';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {useCartStore} from 'shared/stores/CartStore';

import {ProductInfoStyles as styles} from './ProductInfo.styles';

type ProductInfoProps = {
  product: Product;
  fromOrders?: boolean;
};

export const ProductInfo = ({product, fromOrders=true}: ProductInfoProps) => {
  const [isFavorite, setIsFavorite] = useState(false); //временно тут затем из запроса
  const [rating, setRating] = useState(0);
  const {t} = useTranslation();
  const navigation = useAppNavigation();

  const {
    addItem,
    items,
    removeItem,
    incrementItem,
    decrementItem,
    getItemQuantity,
  } = useCartStore();
  const {token, user} = useUserStore();

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
      return <Image source={product.image} style={styles.productImage} />;
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
        <Text style={TextStyles.p1.changeColor(Colors.Black200)}>{product.rating} </Text>
        <Text style={TextStyles.p1.changeColor(Colors.Gray500)}>
          {`(${product.reviewerscount})`}
        </Text>
      </View>
    );
  };

  // const renderReviewMake = () => {
  //   return (
  //     <View style={styles.reviewContainer}>
  //       {[1, 2, 3, 4, 5].map((star) => (
  //         <TouchableOpacity key={star} onPress={() => setRating(star)}>
  //           <StarIcon
  //             fill={star <= rating ? Colors.Yellow500 : Colors.Gray500}
  //             width={IconStyles.small.width}
  //             height={IconStyles.small.height}
  //           />
  //         </TouchableOpacity>
  //       ))}
  //       <Text style={TextStyles.p1.changeColor(Colors.Black200)}>
  //         Оценка: {rating}
  //       </Text>
  //     </View>
  //   );
  // };

  const renderReviewMake = () => {
    const [userRating, setUserRating] = useState(0); // Храним текущую оценку пользователя
  
    // Функция для изменения оценки
    const handleStarPress = (rating: number) => {
      setUserRating(rating);
    };
  
    // Рендер звезд в зависимости от текущего рейтинга
    const renderStars = () => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
            <StarIcon
              fill={
                i <= userRating
                  ? Colors.Yellow500 // Подсвечиваем звезды до текущего рейтинга
                  : Colors.Gray500 // Остальные остаются серыми
              }
              width={IconStyles.medium.width}
              height={IconStyles.medium.height}
            />
          </TouchableOpacity>
        );
      }
      return stars;
    };
  
    return (
      <View style={styles.reviewContainer}>
        <Text style={TextStyles.p1.changeColor(Colors.Black200)}>
          {t('Оцените товар')}:
        </Text>
        <View style={styles.starsContainer}>{renderStars()}</View>
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
              <Text style={TextStyles.p1.changeColor(Colors.Gray500)}>
                {product.category}
              </Text>
              {renderScore()}
              <Text style={TextStyles.p1.changeColor(Colors.Gray500)}>
                {seller}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleFavoritePress}
              style={styles.favoriteIcon}>
              {renderFavoriteIcon()}
            </TouchableOpacity>
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
        <View>
          {fromOrders && renderReviewMake()}
        </View>
        <View style={styles.buttonsContainer}>
          {isCartItem() ? (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.inCartButton}
                onPress={handleGoToCart}>
                <Text style={styles.buttonText}>{t('В корзине')}</Text>
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
            <TouchableOpacity
              onPress={handleAddToCart}
              style={styles.addToCartButton}>
              <Text style={styles.buttonText}>{t('В корзину')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};
