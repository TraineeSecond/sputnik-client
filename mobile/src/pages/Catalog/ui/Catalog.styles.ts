import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const CatalogPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    paddingVertical: 10,
  },
  productItem: {
    width: '46%',
    margin: '2%',
    marginBottom: 15,
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
