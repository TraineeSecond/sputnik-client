import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const CatalogPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White100,
    padding: 20,
  },
  text: {
    fontSize: 24,
    color: 'gray',
  },
  flatList: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productItem: {
    width: '46%',
    margin: '2%',
    marginBottom: 15,
  },
});
