import {Dimensions, StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

const {width} = Dimensions.get('window');

export const SellerProductsStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.White100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productItem: {
    width: width / 2 - 16,
    margin: 8,
  },
  scrollView: {
    paddingVertical: 10,
  },
});
