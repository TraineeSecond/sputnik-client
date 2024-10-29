import React, {useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl, ScrollView, Text, View} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {Product} from 'entities/product';
import {useUserStore} from 'entities/user';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {Colors, TextStyles} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {Order, useOrderStore} from 'shared/stores/OrderStore';
import {ProductItem} from 'shared/ui';

import {OrdersPageStyles as styles} from './Orders.style';

export const Orders = () => {
  const {getOrders, orders, isLoading} = useOrderStore();
  const {user, token} = useUserStore();

  const {t} = useTranslation();

  useEffect(() => {
    getOrders(user.id, token);
  }, [user.id]);

  const navigation = useAppNavigation();

  const onRefresh = useCallback(async () => {
    await getOrders(user.id, token);
  }, [getOrders]);

  const handleProductPress = (product: Product) => {
    if (product) {
      navigation.navigate(Screens.PRODUCT, {
        product,
      });
    }
  };

  const renderSkeleton = (index: number) => (
    <View key={index}>
      <ContentLoader
        style={styles.productItem}
        speed={2}
        width={180}
        height={220}
        viewBox="0 0 160 220"
        backgroundColor={Colors.Gray200}
        foregroundColor={Colors.Gray400}>
        <Rect x="0" y="0" rx="10" ry="10" width="160" height="220" />
      </ContentLoader>
    </View>
  );

  const renderProductItem = (order: Order) => {
    return order.orderitems.map(item => {
      const {id, product} = item;
      return (
        <ProductItem
          key={id}
          id={id.toString()}
          price={product.price}
          name={product.name}
          images={product.images}
          newPrice={product.new_price}
          sellerName={product.user.name}
          sellerSurname={product.user.surname}
          rating={product.rating}
          reviewerscount={product.reviewerscount}
          onPress={() => handleProductPress(product)}
          style={styles.productItem}
          apellationButton={true}
        />
      );
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }>
      <Text
        style={[TextStyles.h1.changeColor(Colors.Green400), styles.toptext]}
        accessible={true}
        accessibilityLabel={t('Ваша история покупок')}>
        {t('Ваша история покупок')}
      </Text>
      {isLoading
        ? [1, 2, 3, 4, 5, 6].map((_, index) => renderSkeleton(index))
        : orders.map(renderProductItem)}
    </ScrollView>
  );
};
