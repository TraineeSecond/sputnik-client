import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers';

export const ProductItemStyles = StyleSheet.create({
  container: {
    width: 210,
    overflow: 'hidden',
    alignItems: 'flex-start',
    gap: 3,
  },
  imageContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    aspectRatio: 1,
    backgroundColor: Colors.Gray200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 6,
    borderRadius: '100%',
    backgroundColor: Colors.Black100Opacity20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
  },
  name: {
    flex: 1,
  },
  reviews: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 12,
    color: 'green',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
  },
  strikethroughPrice: {
    textDecorationLine: 'line-through',
  },
  alertButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 10,
  },
});
