import React, {useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {Product} from 'entities/product';
import {useUserStore} from 'entities/user';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {useOrientation} from 'shared/hooks';
import {Colors, TextStyles} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {Order, useOrderStore} from 'shared/stores/OrderStore';
import {ProductItem} from 'shared/ui';

import {OrdersPageStyles as styles} from './Orders.style';

export const Orders = () => {
  const {getOrders, orders, isLoading} = useOrderStore();
  const {user, token} = useUserStore();

  const {t} = useTranslation();

  const isLandscape = useOrientation();
  const {width} = Dimensions.get('window');
  const itemWidth = isLandscape ? width / 4 - 21 : width / 2 - 26;

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

  const renderProductItem = ({order, index}: {order: Order; index: number}) => {
    return order.orderitems.map(item => {
      const {id, product} = item;
      return (
        <ProductItem
          key={id}
          id={product.id.toString()}
          price={product.price}
          name={product.name}
          images={product.images}
          newPrice={product.new_price}
          sellerName={product.user.name}
          sellerSurname={product.user.surname}
          rating={product.rating}
          reviewerscount={product.reviewerscount}
          onPress={() => handleProductPress(product)}
          // style={style}
          style={[styles.productItem, {width: itemWidth}]}
          apellationButton={true}
          sellerId={product.user.id}
        />
      );
    });
  };

  const renderElement = ({item, index}: {item: Order; index: number}) => {
    if (isLoading) {
      return renderSkeleton(index);
    }
    return <>{renderProductItem({order: item as Order, index})}</>;
  };

  const keyExtractor = (item: any, index: number) =>
    isLoading ? index.toString() : item.id.toString();

  return (
    <FlatList
      key={`flatListOrders-${isLandscape ? 4 : 2}`}
      data={isLoading ? [1, 2, 3, 4, 5] : orders}
      keyExtractor={keyExtractor}
      renderItem={({item, index}) => renderElement({item, index})}
      initialNumToRender={5}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.ordersContainer}
      ListHeaderComponent={
        <Text
          style={[TextStyles.h1.changeColor(Colors.Green400), styles.toptext]}
          accessible={true}
          accessibilityLabel={t('Ваша история покупок')}>
          {t('Ваша история покупок')}
        </Text>
      }
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
      numColumns={isLandscape ? 5 : 3}
    />
  );
};
