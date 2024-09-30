import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const SearchStyles = StyleSheet.create({
  marginBottom: {
    paddingBottom: 10,
    marginBottom: 5,
  },

  activeCategory: {
    backgroundColor: Colors.Green100Opacity30,
  },
  inactiveCategory: {
    opacity: 0.3,
  },
  default: {
    height: 40,
    width: 85,
    borderRadius: 10,
  },
});
