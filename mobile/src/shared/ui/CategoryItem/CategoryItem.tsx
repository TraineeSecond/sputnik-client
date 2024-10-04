import React, {memo} from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Colors, TextStyles} from 'shared/libs/helpers';

import {CategoryItemStyles as styles} from './CategoryItem.styles';

type CategoryItemProps = {
  id: string;
  title: string;
  image?: ImageSourcePropType;
  style?: object;
  onPress: () => void;
};

export const CategoryItem = memo(
  ({id, title, image, style, onPress}: CategoryItemProps) => {
    return (
      <TouchableOpacity
        id={id}
        onPress={onPress}
        style={styles.container}
        activeOpacity={1}>
        <View style={[styles.imageContainer, style]}>
          {image ? (
            <Image source={image} style={styles.image} />
          ) : (
            <Text style={TextStyles.span1.changeColor(Colors.Gray500)}>
              {title}
            </Text>
          )}
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
