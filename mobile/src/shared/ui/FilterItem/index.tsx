import {Filter} from 'entities/filter';
import React, {memo} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Colors, TextStyles} from 'shared/libs/helpers';
import {FilterItemStyles as styles} from './FilterItem.styles';

type FilterItemProps = {
  item: Filter;
  onPress: () => void;
};

export const FilterItem = memo(({item, onPress}: FilterItemProps) => {
  const {id, title, image} = item;

  return (
    <TouchableOpacity
      id={id}
      onPress={onPress}
      style={styles.container}
      activeOpacity={1}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <Text
        style={TextStyles.span1.changeColor(Colors.Black200)}
        numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
});
