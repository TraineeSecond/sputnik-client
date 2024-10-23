import React from 'react';
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
  return (
    <View style={StyleSheet.compose(styles.container, style)}>
      <TouchableOpacity
        activeOpacity={1}
        accessible={true}
        accessibilityLabel="Промоакция"
        accessibilityRole={'image'}>
        <Image source={image} style={styles.bannerImage} resizeMode="cover" />
      </TouchableOpacity>
    </View>
  );
};
