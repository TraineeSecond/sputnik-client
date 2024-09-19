import React, {useCallback, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {HomePageStyles as styles} from './Home.styles';
import {Promo} from 'shared/ui';
import {Slider} from 'widgets';
import {FilterItem, ProductItem} from 'shared/ui';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {Screens, Stacks} from 'app/navigation/navigationEnums';
import {
  categories,
  products,
  promoPicture,
  promoPictureSecond,
} from 'shared/assets/mockData';
import {useUserStore} from 'entities/user';

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
    ({item, index}: {item: any; index: number}) => (
      <FilterItem
        key={index}
        item={item}
        onPress={() => handleFilterPress(item.keyWord)}
      />
    ),
    [handleFilterPress],
  );

  const renderProductItem = useCallback(
    ({item, index}: {item: any; index: number}) => (
      <ProductItem
        key={index}
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
        data={categories}
        renderItem={renderFilterItem}
        style={styles.marginBottom}
      />
      <Slider
        title="Для вас"
        data={products}
        renderItem={renderProductItem}
        style={styles.marginBottom}
      />
      <Slider
        title="Подборка на лето"
        data={products}
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
