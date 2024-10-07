import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export const CarouselStyles = StyleSheet.create({
  child: {width, justifyContent: 'center'},

  image: {
    width: '100%',
    height: '100%',
  },
});
