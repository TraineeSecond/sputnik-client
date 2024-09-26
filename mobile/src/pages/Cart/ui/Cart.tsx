import React, {useEffect} from 'react';
import {Alert, View, ScrollView, Text} from 'react-native';
import {Button} from '@ui-kitten/components';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {useTranslation} from 'react-i18next';

import {useCartStore} from 'shared/stores/CartStore';
import {CartItem} from 'shared/ui';
import {CartPageStyles as styles} from './Cart.styles';
import {useUserStore} from 'entities/user';
import {Colors, TextStyles} from 'shared/libs/helpers';
import {CartItemType} from 'entities/CartItem';

export const Cart = () => {
  const {
    getItems,
    items,
    incrementItem,
    decrementItem,
    clearCart,
    removeItem,
    isLoading,
    setIsLoading,
    id,
  } = useCartStore();

  const {token, user} = useUserStore();

  const {t} = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    getItems(token, user.id);

    setIsLoading(false);
  }, []);

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Корзина пуста');
      return;
    }
    Alert.alert('Заказ успешно оформлен');
    clearCart(token, user.id);
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
        image={item.image}
        price={item.price}
        quantity={item.quantity}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onRemove={handleRemove}
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

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ScrollView contentContainerStyle={{paddingBottom: 60}}>
          {[1, 2, 3, 4, 5].map((_, index) => renderSkeleton(index))}
        </ScrollView>
      ) : items.length > 0 ? (
        <>
          <ScrollView contentContainerStyle={{paddingBottom: 60}}>
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
