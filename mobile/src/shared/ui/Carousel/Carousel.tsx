import React from 'react';
import {Image, ScrollView, View} from 'react-native';

import {ImageOwn} from 'entities/product';

import {CarouselStyles as styles} from './Carousel.styles';

type CarouselProps = {
  images: ImageOwn[];
};

export const Carousel = ({images}: CarouselProps) => {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      {images.map((item, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image
            source={{uri: item.image as string}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      ))}
    </ScrollView>
  );
};
