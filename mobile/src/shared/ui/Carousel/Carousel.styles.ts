import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export const CarouselStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  imageContainer: {
    width: width,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
