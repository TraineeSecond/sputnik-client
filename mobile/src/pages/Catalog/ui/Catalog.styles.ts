import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const CatalogPageStyles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Colors.White100,
  },
  productItem: {
    width: '46%',
    margin: '2%',
    marginBottom: 15,
  },
});
