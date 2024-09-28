import React, {useCallback} from 'react';
import {View} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {Category, Product} from 'entities';
import ContentLoader from 'react-content-loader';
import {Circle} from 'react-native-svg';
import {Colors} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {CategoryItem, ProductItem} from 'shared/ui';
import {Slider} from 'widgets';

import {SearchStyles as styles} from './styles';

type SearchProps = {
  catalogData: Product[];
  categories: Category[];
  isLoading: boolean;
  currentCategory: string;
  setCategory: (category: string) => void;
};

export const Search = ({
  isLoading,
  categories,
  catalogData,
  currentCategory,
  setCategory,
}: SearchProps) => {
  const navigation = useAppNavigation();

  const handleCategoryPress = useCallback((title: string) => {
    //подсветка включенной категории
    //добавление включенной категориии в стор
    //при повторном клике сброс
  }, []);

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

  return (
    <>
      <Slider
        isLoading={isLoading}
        data={categories}
        renderItem={renderCategoryItem}
        renderSkeleton={renderSkeletonCategory}
        style={styles.marginBottom}
      />
      {catalogData.map(renderProductItem)}
    </>
  );
};
