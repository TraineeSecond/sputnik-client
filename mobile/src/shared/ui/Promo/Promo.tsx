import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {PromoStyles as styles} from './Promo.styles';

type PromoProps = {
  style?: object;
  image: ImageSourcePropType;
  // onPress: () => void;
};

export const Promo = ({style, image}: PromoProps) => {
  const {t} = useTranslation();

  return (
    <View style={StyleSheet.compose(styles.container, style)}>
      <TouchableOpacity
        activeOpacity={1}
        accessible={true}
        accessibilityLabel={t('Промоакция')}
        accessibilityRole={'image'}>
        <Image source={image} style={styles.bannerImage} resizeMode="cover" />
      </TouchableOpacity>
    </View>
  );
};
