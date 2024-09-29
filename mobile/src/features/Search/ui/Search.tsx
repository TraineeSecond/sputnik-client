import React, {useCallback, useEffect} from 'react';
import {View} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {Category, Product} from 'entities';
import ContentLoader from 'react-content-loader';
import {Circle} from 'react-native-svg';
import {Colors} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {CategoryItem, ProductItem} from 'shared/ui';
import {Slider} from 'widgets';

import {useSearchStore} from '..';
import {SearchStyles as styles} from './styles';

type SearchProps = {
  catalogData: Product[];
};

export const Search = ({catalogData}: SearchProps) => {
  const navigation = useAppNavigation();

  const {
    isLoading,
    categories,
    foundProducts,
    currentCategory,
    setCategory,
    setIsLoading,
    setFoundProducts,
    fetchProducts,
  } = useSearchStore();

  useEffect(() => {
    setFoundProducts(catalogData);
  }, []);

  const handleCategoryPress = useCallback(
    (category: string) => {
      setCategory(category);
    },
    [setCategory, fetchProducts],
  );

  const renderCategoryItem = ({
    item,
    index,
  }: {
    item: Category;
    index: number;
  }) => {
    const isActive = currentCategory === item;
    const handlePress = () => handleCategoryPress(item);
    const categoryStyle = currentCategory
      ? isActive
        ? styles.activeCategory
        : styles.inactiveCategory
      : null;

    return (
      <CategoryItem
        key={index}
        id={index.toString()}
        title={item}
        onPress={handlePress}
        style={[categoryStyle]}
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
        sellerSurname={user.surname}
        onPress={handlePress}
        style={styles.productItem}
      />
    );
  };

  // TODO: поменять на flatlist

  return (
    <>
      <Slider
        isLoading={isLoading}
        data={categories}
        renderItem={renderCategoryItem}
        renderSkeleton={renderSkeletonCategory}
        style={styles.marginBottom}
      />
      {foundProducts.map(renderProductItem)}
    </>
  );
};
