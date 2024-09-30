import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers';

export const HeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    gap: 30,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.White100,
  },
  homeContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  productContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  logo: {
    height: 30,
  },
  searchContainer: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  input: {
    backgroundColor: Colors.Gray200,
    color: Colors.Black200,
    padding: 0,
    paddingHorizontal: 10,
    height: 30,
    fontSize: 14,
  },
});
