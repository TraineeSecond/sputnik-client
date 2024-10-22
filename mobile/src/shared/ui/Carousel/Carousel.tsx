import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  View,
  ViewToken,
  VirtualizedList,
} from 'react-native';

import {ImageOwn} from 'entities/product';

import {CarouselStyles as styles} from './Carousel.styles';

type CarouselProps = {
  images: ImageOwn[];
};

export const Carousel = ({images}: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef<FlatList<ImageOwn>>(null);

  const screenWidth = Dimensions.get('window').width;

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0) {
        setCurrentSlide(viewableItems[0].index || 0);
      }
    },
  ).current;

  const renderItem = ({item}: {item: ImageOwn}) => (
    <View style={[styles.imageContainer, {width: screenWidth}]}>
      <Image
        source={{uri: item.image as string}}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <View style={styles.carousel}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={2}
      />
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentSlide === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};
