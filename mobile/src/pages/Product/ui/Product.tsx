import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {RootStackParamsList} from 'app/navigation/navigationTypes';
import {useProductStore} from 'entities/product';
import {ProductInfo} from 'features/ProductInfo';
import {ShowError} from 'shared/ui';

import {ProductPageStyles as styles} from './Product.styles';

type ProductRouteProp = RouteProp<RootStackParamsList, Screens.PRODUCT>;

export const Product = () => {
  const route = useRoute<ProductRouteProp>();
  const {product: initialProduct} = route.params;
  const {t} = useTranslation();
  const {currentProduct, isLoading, error, fetchProduct, setProduct} =
    useProductStore();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
    }
  }, [initialProduct, setProduct]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchProduct(initialProduct.id);
    setRefreshing(false);
  }, []);

  const renderLoader = () => (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" />
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {error && (
        <ShowError
          textError={`${t('Ошибка.')} ${t(
            'Попробуйте перезагрузить страницу',
          )}`}
        />
      )}
      {isLoading && !refreshing && renderLoader()}
      {currentProduct && <ProductInfo product={currentProduct} />}
      {/* <Reviews/> */}
    </ScrollView>
  );
};
