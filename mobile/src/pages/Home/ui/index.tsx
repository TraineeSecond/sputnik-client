import React, {useCallback, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {Slider} from 'widgets';
import {CategoryItem, ProductItem, Promo} from 'shared/ui';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {Screens, Stacks} from 'app/navigation/navigationEnums';
import {
  categories,
  products,
  promoPicture,
  promoPictureSecond,
} from 'shared/assets/mockData';
import {HomePageStyles as styles} from './Home.styles';
import {useTranslation} from 'react-i18next';
import {useUserStore} from 'entities/user';
import {useProductListStore} from 'entities/productList';
import {Product} from 'entities/product';
import {Category} from 'entities/category';

export const Home = () => {
  const {t} = useTranslation();
  const navigation = useAppNavigation();
  const {loadUserData} = useUserStore();
  const {
    productList,
    categories,
    fetchProducts,
    fetchCategories,
    isLoading,
    error,
  } = useProductListStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    loadUserData();
  }, []);

  const handleProductPress = (productId: number) => {
    const product = productList.find(p => p.id === productId);
    if (product) {
      navigation.navigate(Screens.PRODUCT, {
        product,
      });
    }
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

  const renderCategoryItem = useCallback(
    ({item, index}: {item: Category; index: number}) => {
      const handlePress = () => handleCategoryPress(item);
      return (
        <CategoryItem
          key={index}
          id={`${index}`}
          title={item}
          onPress={handlePress}
        />
      );
    },
    [handleCategoryPress],
  );

  const renderProductItem = useCallback(
    ({item}: {item: Product}) => {
      const {id, name, category, description, price, new_price, user} = item;
      const handlePress = () => handleProductPress(id);

      return (
        <ProductItem
          id={`${id}`}
          key={id}
          name={name}
          price={price}
          newPrice={new_price}
          sellerName={user.name}
          sellerSurname={user.surname}
          onPress={handlePress}
        />
      );
    },
    [handleProductPress],
  );

  //TODO: получать подборки и их названия с бэка
  const [firstHalf, secondHalf] = [
    productList.slice(0, productList.length / 2),
    productList.slice(productList.length / 2),
  ];

  return (
    <ScrollView style={styles.container}>
      <Promo
        image={promoPicture}
        // onPress={handlePromoPress}
        style={[styles.marginBottom, styles.promo]}
      />
      <Slider
        title={t('Категории')}
        data={categories}
        renderItem={renderCategoryItem}
        style={styles.marginBottom}
      />
      <Slider
        title="Для вас"
        data={firstHalf}
        renderItem={renderProductItem}
        style={styles.marginBottom}
      />
      <Slider
        title="Подборка на лето"
        data={secondHalf}
        renderItem={renderProductItem}
        style={styles.marginBottom}
      />
      <Promo
        image={promoPictureSecond}
        style={styles.promo}
        // onPress={handlePromoPress}
      />
    </ScrollView>
  );
};
