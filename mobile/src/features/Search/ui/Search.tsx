import React, {useCallback} from 'react';
import {Text, View} from 'react-native';

import {Category} from 'entities';
import ContentLoader from 'react-content-loader';
import {Circle} from 'react-native-svg';
import {Colors} from 'shared/libs/helpers';
import {CategoryItem} from 'shared/ui';
import {Slider} from 'widgets';

import {SearchStyles as styles} from './styles';

type SearchProps = {
  isLoading: boolean;
  categories: Category[];
  currentCategory: string;
  setCategory: (category: string) => void;
  fetchProducts: () => Promise<void>;
};

export const Search = ({
  isLoading,
  categories,
  currentCategory,
  setCategory,
  fetchProducts,
}: SearchProps) => {
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
        style={[styles.default, categoryStyle]}
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

  return (
    <Slider
      isLoading={isLoading}
      data={categories}
      renderItem={renderCategoryItem}
      renderSkeleton={renderSkeletonCategory}
      style={styles.marginBottom}
    />
  );
};
