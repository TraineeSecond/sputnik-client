import {StyleSheet} from 'react-native';
import {Colors} from 'shared/libs/helpers/colors';

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White100,
    alignItems: 'center',
    marginTop: 171,
  },

  input: {
    backgroundColor: Colors.Gray300,
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
    width: 275,
    height: 48,
    marginBottom: 20,
  },

  button1: {
    backgroundColor: Colors.Purple100,
    paddingHorizontal: 126,
    paddingVertical: 11,
    borderRadius: 12,
    marginTop: 22,
  },

  button2: {
    marginTop: 34,
  },
});
