import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White100,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  form: {
    justifyContent: 'flex-start',
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  input: {
    backgroundColor: Colors.Gray300,
    borderRadius: 10,
    width: 275,
    height: 48,
  },
  controls: {
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 35,
  },
  button: {
    backgroundColor: Colors.Green500,
    width: '100%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
});
