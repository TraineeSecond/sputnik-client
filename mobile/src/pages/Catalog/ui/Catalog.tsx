import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  View,
} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {Product} from 'entities/product';
import {useUserStore} from 'entities/user';
import {SearchCatalog, useSearchCatalogStore} from 'features/Search';
import {useOrientation} from 'shared/hooks';
import {Colors} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {ProductItem, ShowError} from 'shared/ui';

import {CatalogPageStyles as styles} from './Catalog.styles';

export const Catalog = () => {
  const {t} = useTranslation();
  const navigation = useAppNavigation();
  const isLandscape = useOrientation();

  const [isRefresh, setIsRefresh] = useState(false);
  const {
    error,
    hasMore,
    category,
    categories,
    foundProducts,
    isSearchLoading,
    isMomentumScroll,
    isPaginationLoading,
    setPage,
    setCategory,
    incrementPage,
    fetchProducts,
    fetchStartData,
    setIsMomentumScroll,
  } = useSearchCatalogStore();
  const {user} = useUserStore();

  const hideButton = user.role === 'seller';
  const {width} = Dimensions.get('window');
  const itemWidth = isLandscape ? width / 4 - 16 : width / 2 - 16;

  const onRefresh = useCallback(async () => {
    setIsRefresh(true);
    setPage(1);
    await fetchStartData();
    setIsRefresh(false);
  }, [fetchStartData, setPage]);

  const handleProductPress = (product: Product) => {
    navigation.navigate(Screens.PRODUCT, {
      product,
    });
  };

  const handleEndReached = () => {
    if (!isPaginationLoading && hasMore && !isMomentumScroll) {
      incrementPage();
      fetchProducts();
      setIsMomentumScroll(true);
    }
  };

  const handleMomentumScrollBegin = () => {
    setIsMomentumScroll(false);
  };

  const renderProductItem = (item: Product) => {
    const {id, name, price, new_price, user, rating, reviewerscount, images} =
      item;
    const handlePress = () => handleProductPress(item);

    return (
      <ProductItem
        id={`${id}`}
        key={id}
        name={name}
        price={price}
        rating={rating}
        images={images}
        newPrice={new_price}
        sellerName={user.name}
        hideButton={hideButton}
        style={[styles.productItem, {width: itemWidth}]}
        sellerSurname={user.surname}
        reviewerscount={reviewerscount}
        onPress={handlePress}
      />
    );
  };

  const renderFlatListItem = ({item}: {item: Product}) =>
    renderProductItem(item);

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel={t('Каталог товаров')}>
      <View style={styles.filters}>
        <SearchCatalog
          isLoading={isRefresh}
          categories={categories}
          category={category}
          setCategory={setCategory}
          fetchProducts={fetchProducts}
        />
      </View>
      {error && (
        <ShowError
          textError={`${t('Ошибка')} ${t('Попробуйте перезагрузить страницу')}`}
        />
      )}
      {isSearchLoading ? (
        <View style={styles.skeleton}>
          <ActivityIndicator size="large" color={Colors.Gray500} />
        </View>
      ) : (
        <FlatList
          key={`flatList-${isLandscape ? 4 : 2}`}
          numColumns={isLandscape ? 4 : 2}
          data={foundProducts}
          renderItem={renderFlatListItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.scrollView}
          initialNumToRender={10}
          onEndReachedThreshold={0.5}
          onEndReached={handleEndReached}
          onMomentumScrollBegin={handleMomentumScrollBegin}
          ListFooterComponent={
            isPaginationLoading && !isRefresh ? (
              <ActivityIndicator size="large" color={Colors.Gray500} />
            ) : null
          }
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};
