import React from 'react';
import {Image, View} from 'react-native';

import {ImageOwn} from 'entities/product';
import SwiperFlatList from 'react-native-swiper-flatlist';

import {CarouselStyles as styles} from './Carousel.styles';

type CarouselProps = {
  images: ImageOwn[];
};

export const Carousel = ({images}: CarouselProps) => {
  return (
    <SwiperFlatList
      autoplay
      autoplayDelay={2}
      autoplayLoop
      showPagination
      data={images}
      renderItem={({item}) => (
        <View style={[styles.child, {backgroundColor: item}]}>
          <Image
            source={{uri: item.image as string}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}
    />
  );
};
