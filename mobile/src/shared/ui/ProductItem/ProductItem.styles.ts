import {StyleSheet} from 'react-native';
import {Colors} from 'shared/libs/helpers';

export const ProductItemStyles = StyleSheet.create({
  container: {
    width: 210,
    alignItems: 'flex-start',
    gap: 3,
  },
  imageContainer: {
    width: 210,
    height: 210,
    backgroundColor: Colors.Gray200,
    borderRadius: 10,
  },
  image: {
    width: 210,
    height: 210,
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
});
