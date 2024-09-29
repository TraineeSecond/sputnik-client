import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const ProductPageStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White100,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
