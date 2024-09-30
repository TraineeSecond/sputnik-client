import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers';

export const InputStyles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
  },
  input: {
    backgroundColor: Colors.Gray300,
    borderRadius: 10,
    width: '100%',
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
