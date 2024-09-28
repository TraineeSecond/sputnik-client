import React, {useCallback, useEffect} from 'react';
import {RefreshControl, ScrollView} from 'react-native';

import {useProductListStore} from 'entities/productList';
import {Search, useSearchStore} from 'features/Search';

import {CatalogPageStyles as styles} from './Catalog.styles';

export const Catalog = () => {
  const {
    isLoading,
    categories,
    foundProducts,
    currentCategory,
    setCategory,
    setIsLoading,
    setFoundProducts,
  } = useSearchStore();
  const {allProductList, fetchAllProducts} = useProductListStore();

  useEffect(() => {
    setFoundProducts(allProductList);
  }, []);

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
      <Search
        catalogData={foundProducts}
        isLoading={isLoading}
        categories={categories}
        currentCategory={currentCategory}
        setCategory={setCategory}
      />
    </ScrollView>
  );
};
