import React, {useCallback, useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {Product} from 'entities/product';
import {Search, useSearchCatalogStore} from 'features/Search';
import {Colors} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {ProductItem} from 'shared/ui';

import {CatalogPageStyles as styles} from './Catalog.styles';

export const Catalog = () => {
  const navigation = useAppNavigation();
  const [isRefresh, setIsRefresh] = useState(false);
  const {
    category,
    isLoading,
    categories,
    foundProducts,
    setCategory,
    fetchProducts,
    fetchStartData,
  } = useSearchCatalogStore();

  const onRefresh = useCallback(async () => {
    setIsRefresh(true);
    await Promise.all([fetchStartData()]);
    setIsRefresh(false);
  }, [fetchStartData]);

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

  const showLoader = isLoading && !isRefresh;

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <Search
          isLoading={isLoading}
          categories={categories}
          category={category}
          setCategory={setCategory}
          fetchProducts={fetchProducts}
        />
      </View>
      {showLoader ? (
        <View style={styles.skeleton}>
          <ActivityIndicator size="large" color={Colors.Gray500} />
        </View>
      ) : (
        <FlatList
          numColumns={2}
          data={foundProducts}
          renderItem={({item}) => renderProductItem(item)}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.scrollView}
          initialNumToRender={8}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};
