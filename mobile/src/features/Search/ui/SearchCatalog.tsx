import React, {useCallback} from 'react';

import {Category} from 'entities';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {Colors} from 'shared/libs/helpers';
import {CategoryItem} from 'shared/ui';
import {Slider} from 'widgets';

import {SearchStyles as styles} from './styles';

type SearchProps = {
  isLoading: boolean;
  categories: Category[];
  category: string;
  setCategory: (category: string) => void;
  fetchProducts: () => Promise<void>;
};

export const SearchCatalog = ({
  isLoading,
  categories,
  category,
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
    const isActive = category === item;
    const handlePress = () => handleCategoryPress(item);
    const categoryStyle = category
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
    <ContentLoader
      key={index}
      speed={2}
      width={85}
      height={40}
      viewBox="0 0 85 40"
      backgroundColor={Colors.Gray200}
      foregroundColor={Colors.Gray400}>
      <Rect x="0" y="0" rx="10" ry="10" width="85" height="40" />
    </ContentLoader>
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
