import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers';

export const InputStyles = StyleSheet.create({
  inputContainer: {
    width: 275,
  },
  input: {
    backgroundColor: Colors.Gray300,
    borderRadius: 10,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
