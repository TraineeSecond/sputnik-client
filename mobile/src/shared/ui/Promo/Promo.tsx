import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
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
      <TouchableOpacity activeOpacity={1}>
        <Image source={image} style={styles.bannerImage} resizeMode="cover" />
      </TouchableOpacity>
    </View>
  );
};
