import React, {memo} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import {Colors, TextStyles} from 'shared/libs/helpers';
import {FilterItemStyles as styles} from './FilterItem.styles';

type FilterItemProps = {
  id: string;
  title: string;
  image: ImageSourcePropType;
  onPress: () => void;
};

export const FilterItem = memo(
  ({id, title, image, onPress}: FilterItemProps) => {
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
  },
);
