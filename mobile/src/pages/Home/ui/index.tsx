import React, {useCallback, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {Slider} from 'widgets';
import {FilterItem, ProductItem, Promo} from 'shared/ui';
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
    const loadData = async () => {
      // fetchProducts();
      fetchCategories();
      // loadUserData();
    };
    loadData();
  }, []);

  // console.log('категории', categories);
  // console.log('продукты', productList);

  const handleProductPress = (productId: string) => {
    const product = products.find(p => p.id === productId); // временно не берем из стора а из мока

    if (product) {
      navigation.navigate(Screens.PRODUCT, {
        product,
      });
    }
  };

  const handlePromoPress = (pageId: number) => {
    //  navigation.navigate(страница акции)
  };

  const handleFilterPress = useCallback(
    (title: string) => {
      navigation.navigate(Stacks.MAIN, {
        screen: Screens.CATALOG_TAB,
        params: {
          screen: Screens.CATALOG,
          // filter: keyWord переход на каталог с включенным фильтром
        },
      });
    },
    [navigation],
  );

  const renderFilterItem = useCallback(
    ({item, index}: {item: string; index: number}) => {
      const handlePress = () => handleFilterPress(item);
      return (
        <FilterItem
          key={index}
          id={`${index}`}
          title={item}
          onPress={handlePress}
        />
      );
    },
    [handleFilterPress],
  );

  const renderProductItem = useCallback(
    ({item}: {item: Product}) => {
      const {
        id,
        title,
        image,
        price,
        brand,
        totalScore,
        reviewsCount,
        priceWithDiscount,
      } = item;
      const handlePress = () => handleProductPress(id);

      return (
        <ProductItem
          id={id}
          key={id}
          title={title}
          image={image}
          price={price}
          brand={brand}
          totalScore={totalScore}
          reviewsCount={reviewsCount}
          priceWithDiscount={priceWithDiscount}
          onPress={handlePress}
        />
      );
    },
    [handleProductPress],
  );

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
        renderItem={renderFilterItem}
        style={styles.marginBottom}
      />
      {/* <Slider
        title="Для вас" // получаем из запроса
        data={products as Product[]} //временно
        renderItem={renderProductItem}
        style={styles.marginBottom}
      />
      <Slider
        title="Подборка на лето" // получаем из запроса
        data={products as Product[]} //временно
        renderItem={renderProductItem}
        style={styles.marginBottom}
      /> */}
      <Promo
        image={promoPictureSecond}
        style={styles.promo}
        // onPress={handlePromoPress}
      />
    </ScrollView>
  );
};
