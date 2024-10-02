import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl, ScrollView, View} from 'react-native';

import {Screens, Stacks} from 'app/navigation/navigationEnums';
import {Category} from 'entities/category';
import {Product} from 'entities/product';
import {useProductListStore} from 'entities/productList';
import {useUserStore} from 'entities/user';
import ContentLoader, {Circle, Rect} from 'react-content-loader/native';
import {promoPicture, promoPictureSecond} from 'shared/assets/mockData';
import {Colors} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {CategoryItem, ProductItem, Promo, ShowError} from 'shared/ui';
import {Slider} from 'widgets';

import {HomePageStyles as styles} from './Home.styles';

export const Home = () => {
  const {t} = useTranslation();
  const navigation = useAppNavigation();
  const {loadUserData} = useUserStore();
  const {
    error,
    isLoading,
    categories,
    productList,
    setIsLoading,
    fetchAllData,
  } = useProductListStore();

  useEffect(() => {
    setIsLoading(true);
    fetchAllData();
    loadUserData();
    setIsLoading(false);
  }, []);

  const onRefresh = useCallback(async () => {
    setIsLoading(true);
    await Promise.all([fetchAllData(), loadUserData()]);
    setIsLoading(false);
  }, [fetchAllData, loadUserData, setIsLoading]);

  const handleProductPress = (product: Product) => {
    navigation.navigate(Screens.PRODUCT, {
      product,
    });
  };

  const handlePromoPress = (pageId: number) => {
    //  navigation.navigate(страница акции)
  };

  const handleCategoryPress = useCallback(
    (title: string) => {
      navigation.navigate(Stacks.MAIN, {
        screen: Screens.CATALOG_TAB,
        params: {
          screen: Screens.CATALOG,
          // title: переход на каталог с включенным фильтром
        },
      });
    },
    [navigation],
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
    const {id, name, price, new_price, user, rating, reviewerscount} = item;
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
        rating={rating}
        reviewerscount={reviewerscount}
        onPress={handlePress}
      />
    );
  };

  const renderSkeletonCategory = (index: number) => (
    <View key={index}>
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
    </View>
  );

  const renderSkeletonProduct = (index: number) => (
    <View key={index}>
      <ContentLoader
        speed={2}
        width={210}
        height={210}
        viewBox="0 0 210 210"
        backgroundColor={Colors.Gray200}
        foregroundColor={Colors.Gray400}>
        <Rect x="0" y="0" rx="10" ry="10" width="210" height="210" />
      </ContentLoader>
    </View>
  );

  //TODO: получать подборки и их названия с бэка
  const [firstHalf, secondHalf] = [
    productList.slice(0, productList.length / 2),
    productList.slice(productList.length / 2),
  ];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
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
            style={[styles.marginBottom, styles.promo]}
          />
          <Slider
            isLoading={isLoading || !productList.length}
            title={t('Категории')}
            data={categories}
            renderItem={renderCategoryItem}
            renderSkeleton={renderSkeletonCategory}
            style={styles.marginBottom}
          />
          <Slider
            isLoading={isLoading || !productList.length}
            title="Для вас"
            data={firstHalf}
            renderItem={renderProductItem}
            renderSkeleton={renderSkeletonProduct}
            style={styles.marginBottom}
          />
          <Slider
            isLoading={isLoading || !productList.length}
            title="Подборка на лето"
            data={secondHalf}
            renderItem={renderProductItem}
            renderSkeleton={renderSkeletonProduct}
            style={styles.marginBottom}
          />
          <Promo
            image={promoPictureSecond}
            style={styles.promo}
            // onPress={handlePromoPress}
          />
        </>
      )}
    </ScrollView>
  );
};
