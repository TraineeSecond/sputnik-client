import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const ProductInfoStyles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: Colors.Gray200,
  },
  productImage: {
    width: 'auto',
    maxHeight: '100%',
    resizeMode: 'contain',
  },
  main: {
    // borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  header: {
    flexDirection: 'column',
  },
  topSection: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandReviews: {
    flexDirection: 'row',
    gap: 10,
  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    flex: 1,
  },
  favoriteIcon: {
    position: 'absolute',
    right: 0,
    zIndex: 10,
    padding: 6,
    borderRadius: '100%',
    backgroundColor: Colors.Gray200,
  },
  bottomSection: {
    gap: 1,
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30,
  },
  addToCartButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.Green400,
    borderRadius: 10,
    padding: 10,
  },
  buyNowButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    backgroundColor: Colors.Green400,
    borderRadius: 10,
    color: Colors.White100,
  },
});
