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
import {useUserStore} from 'entities/user';
import {Filter, Product} from 'entities';
import {HomePageStyles as styles} from './Home.styles';

export const Home = () => {
  const {loadUserData} = useUserStore();
  const navigation = useAppNavigation();

  useEffect(() => {
    loadUserData();
  }, []);

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
    (keyWord: string) => {
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
    ({item}: {item: Filter}) => {
      const {id, title, image, keyWord} = item;
      const handlePress = () => handleFilterPress(keyWord);

      return (
        <FilterItem
          key={id}
          id={id}
          title={title}
          image={image}
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
        title="Категории"
        data={categories as Filter[]} //временно
        renderItem={renderFilterItem}
        style={styles.marginBottom}
      />
      <Slider
        title="Для вас"
        data={products as Product[]} //временно
        renderItem={renderProductItem}
        style={styles.marginBottom}
      />
      <Slider
        title="Подборка на лето"
        data={products as Product[]} //временно
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
