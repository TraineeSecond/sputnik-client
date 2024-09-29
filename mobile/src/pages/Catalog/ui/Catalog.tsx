import React, {useCallback} from 'react';
import {RefreshControl, ScrollView} from 'react-native';

import {useProductListStore} from 'entities/productList';
import {Search} from 'features/Search';

import {CatalogPageStyles as styles} from './Catalog.styles';

export const Catalog = () => {
  const {allProductList, fetchAllProducts, setIsLoading, isLoading} =
    useProductListStore();

  const onRefresh = useCallback(async () => {
    setIsLoading(true);
    await Promise.all([fetchAllProducts()]);
    setIsLoading(false);
  }, [fetchAllProducts, setIsLoading]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }>
      <Search catalogData={allProductList} />
    </ScrollView>
  );
};
