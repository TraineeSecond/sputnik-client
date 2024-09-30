import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const RegisterStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.White100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 110,
    width: 275,
  },
  form: {
    justifyContent: 'flex-start',
    gap: 10,
  },

  seller: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  controls: {
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 35,
    paddingBottom: 30,
    width: '100%',
  },

  button: {
    backgroundColor: Colors.Green500,
    width: '100%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },

  button2: {},
});
