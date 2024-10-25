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
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  header: {
    flexDirection: 'column',
    gap: 5,
  },
  topSection: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -10,
    maxWidth: '100%',
  },
  brandReviews: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    maxWidth: '100%',
  },
  shrink: {
    flexShrink: 1,
  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    flex: 1,
  },
  favoriteIcon: {
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
    alignItems: 'center',
    gap: 15,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: Colors.Green500,
    borderRadius: 10,
  },
  buttonRedirect: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
    backgroundColor: Colors.Green300,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  quantityButton: {
    padding: 15,
  },
  reviewContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 15,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
});
