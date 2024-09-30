import React, {useCallback} from 'react';
import {RefreshControl, ScrollView, Text, View} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {Product} from 'entities/product';
import {Search, useSearchCatalogStore} from 'features/Search';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {ProductItem} from 'shared/ui';

import {CatalogPageStyles as styles} from './Catalog.styles';

export const Catalog = () => {
  const navigation = useAppNavigation();

  const {
    isLoading,
    categories,
    foundProducts,
    allProductList,
    currentCategory,
    setCategory,
    setIsLoading,
    fetchProducts,
    setFoundProducts,
    fetchAllProducts,
  } = useSearchCatalogStore();

  const onRefresh = useCallback(async () => {
    setIsLoading(true);
    await Promise.all([fetchAllProducts()]);
    setIsLoading(false);
  }, [fetchAllProducts, setIsLoading]);

  const handleProductPress = (product: Product) => {
    navigation.navigate(Screens.PRODUCT, {
      product,
    });
  };

  const renderProductItem = (item: Product) => {
    const {id, name, price, new_price, user} = item;
    const handlePress = () => handleProductPress(item);

    return (
      <ProductItem
        id={`${id}`}
        key={id}
        name={name}
        price={price}
        newPrice={new_price}
        sellerName={user.name}
        style={styles.productItem}
        sellerSurname={user.surname}
        onPress={handlePress}
      />
    );
  };

  // TODO: поменять на flatlist

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }>
      {isLoading ? <Text>123</Text> : allProductList.map(renderProductItem)}
    </ScrollView>
  );
};
