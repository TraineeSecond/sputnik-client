import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const CartPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White100,
  },
  centerText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    borderRadius: 10,
    width: 327,
    borderColor: Colors.Green500,
    alignSelf: 'center',
  },
  topContainer: {
    paddingVertical: 10,
  },
});
