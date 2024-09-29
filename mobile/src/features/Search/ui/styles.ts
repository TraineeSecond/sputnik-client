import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const SearchStyles = StyleSheet.create({
  marginBottom: {
    marginBottom: 25,
  },
  productItem: {
    width: '46%',
    margin: '2%',
    marginBottom: 15,
  },
  activeCategory: {
    backgroundColor: Colors.Black100Opacity20,
  },
  inactiveCategory: {
    opacity: 0.3,
  },
});
