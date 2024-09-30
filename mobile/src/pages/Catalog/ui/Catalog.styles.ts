import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const CatalogPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White100,
  },
  scrollView: {
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
  filters: {
    justifyContent: 'center',
    height: 80,
    backgroundColor: Colors.White100,
    borderBottomWidth: 2,
    borderColor: Colors.Gray100,
    elevation: 4,
  },
  skeleton: {
    flex: 1,
    height: 80,
    width: 80,
    // backgroundColor: Colors.Gray500,
  },
});
