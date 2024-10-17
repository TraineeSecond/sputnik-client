import {Dimensions, StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers';

const {width} = Dimensions.get('window');

export const CarouselStyles = StyleSheet.create({
  carousel: {
    position: 'relative',
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 10,
    padding: 6,
    borderRadius: '100%',
    backgroundColor: Colors.Black100Opacity20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: Colors.Green500,
  },
  inactiveDot: {
    backgroundColor: Colors.Gray500,
  },
});
