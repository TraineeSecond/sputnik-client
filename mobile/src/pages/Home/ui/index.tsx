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
import {HomePageStyles as styles} from './Home.styles';
import {Filter} from 'entities/filter';
import {Product} from 'entities/product';

export const Home = () => {
  const {loadUserData} = useUserStore();
  const navigation = useAppNavigation();

  useEffect(() => {
    loadUserData();
  }, []);

  const handleProductPress = (productId: string) => {
    //  navigation.navigate(карточкаТовара)
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
    ({item}: {item: Filter}) => (
      <FilterItem
        key={item.id}
        item={item}
        onPress={() => handleFilterPress(item.keyWord)}
      />
    ),
    [handleFilterPress],
  );

  const renderProductItem = useCallback(
    ({item}: {item: Product}) => (
      <ProductItem
        key={item.id}
        item={item}
        onPress={() => handleProductPress(item.id)}
      />
    ),
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
