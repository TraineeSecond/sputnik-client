import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {Product} from 'entities/product';
import {useUserStore} from 'entities/user';
import {SearchCatalog, useSearchCatalogStore} from 'features/Search';
import {Colors} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {ProductItem, ShowError} from 'shared/ui';

import {CatalogPageStyles as styles} from './Catalog.styles';

export const Catalog = () => {
  const {t} = useTranslation();
  const navigation = useAppNavigation();
  const [isRefresh, setIsRefresh] = useState(false);
  const {
    error,
    category,
    isLoading,
    categories,
    foundProducts,
    setCategory,
    fetchProducts,
    fetchStartData,
  } = useSearchCatalogStore();
  const {user} = useUserStore();

  const hideButton = user.role === 'seller';

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
    const {id, name, price, new_price, user, rating, reviewerscount} = item;
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
        hideButton={hideButton}
        rating={rating}
        reviewerscount={reviewerscount}
      />
    );
  };

  const renderFlatListItem = ({item}: {item: Product}) =>
    renderProductItem(item);

  const showLoader = isLoading && !isRefresh && !error;

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <SearchCatalog
          isLoading={isLoading}
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
      {showLoader ? (
        <View style={styles.skeleton}>
          <ActivityIndicator size="large" color={Colors.Gray500} />
        </View>
      ) : (
        <FlatList
          numColumns={2}
          data={foundProducts}
          renderItem={renderFlatListItem}
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
