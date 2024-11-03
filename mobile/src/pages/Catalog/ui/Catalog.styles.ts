import {Dimensions, StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const CatalogPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White100,
    justifyContent: 'center',
  },
  scrollView: {
    paddingVertical: 10,
  },
  productItem: {
    margin: 8,
  },
  filters: {
    justifyContent: 'center',
    height: 60,
    backgroundColor: Colors.White100,
    borderBottomWidth: 2,
    borderColor: Colors.Gray100,
    elevation: 4,
  },
  skeleton: {
    flex: 1,
    justifyContent: 'center',
  },
});
