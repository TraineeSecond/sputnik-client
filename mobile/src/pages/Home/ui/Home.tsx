import React, {useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl, ScrollView} from 'react-native';

import {Screens, Stacks} from 'app/navigation/navigationEnums';
import {Category, Product} from 'entities';
import {useUserStore} from 'entities/user';
import {useSearchCatalogStore, useSellerProductsStore} from 'features';
import ContentLoader, {Circle, Rect} from 'react-content-loader/native';
import {promoPicture, promoPictureSecond} from 'shared/assets/mockData';
import {useOrientation} from 'shared/hooks';
import {Colors} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {useOrderStore} from 'shared/stores/OrderStore';
import {CategoryItem, ProductItem, Promo, ShowError} from 'shared/ui';
import {Slider} from 'widgets';

import {HomePageStyles as styles} from './Home.styles';

export const Home = () => {
  const {t} = useTranslation();
  const navigation = useAppNavigation();

  const {loadUserData, user, token} = useUserStore();

  const {getOrders} = useOrderStore();

  const {fetchSellerProducts} = useSellerProductsStore();

  const {setCategory, fetchProducts} = useSearchCatalogStore();

  const {error, isSearchLoading, categories, allProductList, fetchStartData} =
    useSearchCatalogStore();

  const isLandscape = useOrientation();

  const hideButton = user.role === 'seller';

  useEffect(() => {
    loadUserData();
    fetchStartData();
  }, []);

  useEffect(() => {
    getOrders(user.id, token);
    user.role === 'seller' && fetchSellerProducts();
  }, [user.id, token]);

  const onRefresh = useCallback(async () => {
    await Promise.all([
      fetchStartData(),
      loadUserData(),
      getOrders(user.id, token),
      user.role === 'seller' && fetchSellerProducts(),
    ]);
  }, [fetchStartData, loadUserData, getOrders]);

  const handleProductPress = (product: Product) => {
    navigation.navigate(Screens.PRODUCT, {
      product,
    });
  };

  const handlePromoPress = (pageId: number) => {
    //  navigation.navigate(страница акции)
  };

  const handleCategoryPress = useCallback(
    (category: string) => {
      setCategory(category);
      fetchProducts();
      navigation.navigate(Stacks.MAIN, {
        screen: Screens.CATALOG_TAB,
        params: {
          screen: Screens.CATALOG,
        },
      });
    },
    [navigation, setCategory],
  );

  const renderCategoryItem = ({
    item,
    index,
  }: {
    item: Category;
    index: number;
  }) => {
    const handlePress = () => handleCategoryPress(item);
    return (
      <CategoryItem
        key={index}
        id={index.toString()}
        title={item}
        onPress={handlePress}
      />
    );
  };

  const renderProductItem = ({item}: {item: Product}) => {
    const {id, name, price, new_price, user, rating, reviewerscount, images} =
      item;
    const handlePress = () => handleProductPress(item);

    return (
      <ProductItem
        id={id.toString()}
        key={id}
        name={name}
        price={price}
        newPrice={new_price}
        sellerName={user.name}
        sellerSurname={user.surname}
        hideButton={hideButton}
        rating={rating}
        reviewerscount={reviewerscount}
        images={images}
        onPress={handlePress}
      />
    );
  };

  const renderSkeletonCategory = (index: number) => (
    <ContentLoader
      key={index}
      speed={2}
      width={95}
      height={108}
      viewBox="0 0 95 95"
      backgroundColor={Colors.Gray200}
      foregroundColor={Colors.Gray400}>
      <Circle x="0" y="0" cx="42.5" cy="42" r="42.5" />
    </ContentLoader>
  );

  const renderSkeletonProduct = (index: number) => (
    <ContentLoader
      speed={2}
      width={210}
      height={210}
      viewBox="0 0 210 210"
      backgroundColor={Colors.Gray200}
      foregroundColor={Colors.Gray400}>
      <Rect x="0" y="0" rx="10" ry="10" width="210" height="210" />
    </ContentLoader>
  );

  //TODO: получать подборки и их названия с бэка

  return (
    <ScrollView
      style={styles.container}
      accessible={true}
      accessibilityLabel={t('Главная страница')}
      accessibilityRole="scrollbar"
      refreshControl={
        <RefreshControl refreshing={isSearchLoading} onRefresh={onRefresh} />
      }>
      {error ? (
        <ShowError
          textError={`${t('Ошибка')} ${t('Попробуйте перезагрузить страницу')}`}
        />
      ) : (
        <>
          <Promo
            image={promoPicture}
            // onPress={handlePromoPress}
            style={[
              styles.marginBottom,
              styles.promo,
              isLandscape && {height: 150},
            ]}
          />
          <Slider
            isLoading={isSearchLoading || !allProductList.length}
            title={t('Категории')}
            data={categories}
            renderItem={renderCategoryItem}
            renderSkeleton={renderSkeletonCategory}
            style={styles.marginBottom}
          />
          <Slider
            isLoading={isSearchLoading || !allProductList.length}
            title={t('Для вас')}
            data={allProductList}
            renderItem={renderProductItem}
            renderSkeleton={renderSkeletonProduct}
            style={styles.marginBottom}
          />
          <Slider
            isLoading={isSearchLoading || !allProductList.length}
            title={t('Подборка на лето')}
            data={allProductList}
            renderItem={renderProductItem}
            renderSkeleton={renderSkeletonProduct}
            style={styles.marginBottom}
          />
          <Promo
            image={promoPictureSecond}
            style={[styles.promo, isLandscape && {height: 150}]}

            // onPress={handlePromoPress}
          />
        </>
      )}
    </ScrollView>
  );
};
