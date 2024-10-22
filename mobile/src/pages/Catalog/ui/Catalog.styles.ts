import {Dimensions, StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

const {width} = Dimensions.get('window');

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
    width: width / 2 - 16,
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
    marginTop: 80,
    flex: 1,
    height: 80,
    width: 80,
  },
});
