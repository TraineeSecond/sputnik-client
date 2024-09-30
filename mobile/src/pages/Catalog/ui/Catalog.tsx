import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {Product} from 'entities/product';
import {Search, useSearchCatalogStore} from 'features/Search';
import ContentLoader from 'react-content-loader';
import {Rect} from 'react-native-svg';
import {Colors} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {ProductItem} from 'shared/ui';

import {CatalogPageStyles as styles} from './Catalog.styles';

export const Catalog = () => {
  const navigation = useAppNavigation();
  const {
    isLoading,
    categories,
    foundProducts,
    category,
    setCategory,
    fetchProducts,
  } = useSearchCatalogStore();

  // TODO: Исправить баг flatList

  // const onRefresh = useCallback(async () => {
  //   setIsLoading(true);
  //   await Promise.all([fetchAllProducts()]);
  //   setIsLoading(false);
  // }, [fetchAllProducts, setIsLoading]);

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

  // const renderSkeletonProduct = (index: number) => (
  //   <ContentLoader
  //     speed={2}
  //     width={210}
  //     height={210}
  //     viewBox="0 0 210 210"
  //     backgroundColor={Colors.Gray200}
  //     foregroundColor={Colors.Gray400}>
  //     <Rect x="0" y="0" rx="10" ry="10" width="210" height="210" />
  //   </ContentLoader>
  // );

  // TODO: Исправить баг flatList

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <Search
          isLoading={true}
          categories={categories}
          category={category}
          setCategory={setCategory}
          fetchProducts={fetchProducts}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        // refreshControl={
        //   <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        // }
      >
        {isLoading ? (
          <View style={styles.skeleton}>
            <ActivityIndicator size="large" color={Colors.Gray500} />
          </View>
        ) : (
          foundProducts.map(renderProductItem)
        )}
      </ScrollView>

      {/* <FlatList
        data={foundProducts}
        renderItem={({item}) => renderProductItem(item)}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
           <Text>Загрузка...</Text> 
        }
      /> */}
    </View>
  );
};
