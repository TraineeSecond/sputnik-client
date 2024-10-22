import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Button} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {MapStackParamsList} from 'app/navigation/navigationTypes';
import {CartItemType} from 'entities/cartItem';
import {useUserStore} from 'entities/user';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {Colors, TextStyles} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {useCartStore} from 'shared/stores/CartStore';
import {useOrderStore} from 'shared/stores/OrderStore';
import {CartItem} from 'shared/ui';

import {CartPageStyles as styles} from './Cart.styles';

export const Cart = () => {
  const {
    items,
    isLoading,
    getItems,
    incrementItem,
    decrementItem,
    clearCart,
    removeItem,
    setIsLoading,
    getProductById,
    selectedPoint,
    fetchSelectedPoint,
    clearSelectedPoint,
  } = useCartStore();

  const {makeOrder} = useOrderStore();

  const {token, user} = useUserStore();

  const navigation = useAppNavigation();
  const navigateMap = useNavigation<NavigationProp<MapStackParamsList>>();

  const {t} = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    getItems(token, user.id);
    fetchSelectedPoint();
    setIsLoading(false);
  }, []);

  const handleProductPress = async (productId: number) => {
    const product = await getProductById(productId);
    if (product) {
      navigation.navigate(Screens.PRODUCT, {
        product,
      });
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Корзина пуста');
      return;
    }

    if (!selectedPoint) {
      Alert.alert('Необходимо выбрать точку доставки');
      return;
    }

    Alert.alert(
      `${t('Заказ успешно оформлен')}`,
      `${t('Заказ будет доставлен по адресу')} \n${selectedPoint.address}`,
    );
    makeOrder(items, user.id, token);
    clearCart(token, user.id);
    clearSelectedPoint();
  };

  const renderItem = (item: CartItemType) => {
    const handleIncrement = () => incrementItem(item.id, token, user.id);
    const handleDecrement = () => decrementItem(item.id, token, user.id);
    const handleRemove = () => removeItem(item.id, token, user.id);

    return (
      <CartItem
        key={item.id}
        id={item.id}
        title={item.title}
        images={item.images}
        price={item.price}
        quantity={item.quantity}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onRemove={handleRemove}
        handleNavigate={handleProductPress}
      />
    );
  };

  const renderSkeleton = (index: number) => (
    <ContentLoader
      key={index}
      speed={2}
      width={450}
      height={124}
      viewBox="0 0 450 124"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <Rect x="14" y="15" rx="10" ry="10" width="85" height="85" />
      <Rect x="120" y="67" rx="15" ry="15" width="90" height="18" />
      <Rect x="120" y="35" rx="15" ry="15" width="160" height="20" />
      <Rect x="293" y="43" rx="5" ry="5" width="30" height="30" />
      <Rect x="332" y="43" rx="5" ry="5" width="30" height="30" />
      <Rect x="372" y="43" rx="5" ry="5" width="30" height="30" />
    </ContentLoader>
  );

  const handleNavToMap = () => {
    navigateMap.navigate(Screens.MAP);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ScrollView contentContainerStyle={{paddingBottom: 60}}>
          {[1, 2, 3, 4, 5].map((_, index) => renderSkeleton(index))}
        </ScrollView>
      ) : items.length > 0 ? (
        <>
          <ScrollView contentContainerStyle={{paddingBottom: 60}}>
            <View style={styles.topContainer}>
              <Text
                style={[
                  selectedPoint
                    ? TextStyles.p1.changeColor(Colors.Black200)
                    : TextStyles.p1.changeColor(Colors.Red500),
                  styles.centerText,
                ]}>
                {selectedPoint
                  ? `${t('Заказ будет доставлен по адресу')} \n ${
                      selectedPoint.address
                    }`
                  : t('Пожалуйста, выберите точку доставки')}
              </Text>
              {!selectedPoint && (
                <Button status="info" onPress={handleNavToMap}>
                  <Text>{t('Перейти на карту')}</Text>
                </Button>
              )}
            </View>
            {items.map(item => renderItem(item))}
          </ScrollView>

          <Button
            style={styles.button}
            status="success"
            onPress={handleCheckout}>
            {t('Оформить заказ')}
          </Button>
        </>
      ) : (
        <Text
          style={[
            TextStyles.h2.changeColor(Colors.Blue100),
            styles.centerText,
          ]}>
          {t('Пустая корзина')}
        </Text>
      )}
    </View>
  );
};
