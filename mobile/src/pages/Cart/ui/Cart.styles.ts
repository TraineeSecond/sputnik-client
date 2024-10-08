import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const CartPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White100,
  },
  centerText: {
    textAlign: 'center',
  },
  button: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: Colors.Green500,
    borderRadius: 10,
  },
});
