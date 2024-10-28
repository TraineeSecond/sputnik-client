import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
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
  title?: string;
  showTitle?: boolean;
  image?: ImageSourcePropType;
  style?: object;
  onPress: () => void;
};

export const CategoryItem = memo(
  ({id, title, image, style, showTitle = true, onPress}: CategoryItemProps) => {
    const {t} = useTranslation();

    return (
      <TouchableOpacity
        id={id}
        accessible={true}
        accessibilityLabel={
          title ? `${t('Категория')}: ${title}` : t('Категория')
        }
        accessibilityRole="button"
        onPress={onPress}
        style={styles.container}
        activeOpacity={0.5}>
        <View style={[styles.imageContainer, style]}>
          {image ? (
            <Image source={image} style={styles.image} />
          ) : (
            <Text style={TextStyles.span1.changeColor(Colors.Gray500)}>
              {title}
            </Text>
          )}
        </View>
        {showTitle && (
          <Text
            style={TextStyles.span1.changeColor(Colors.Black200)}
            numberOfLines={1}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    );
  },
);
