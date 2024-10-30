import {Dimensions, StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

const {width, height} = Dimensions.get('window');
const isLandscape = width > height;
const itemWidth = isLandscape ? width / 4 - 16 : width / 2 - 16;

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
    width: itemWidth,
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
