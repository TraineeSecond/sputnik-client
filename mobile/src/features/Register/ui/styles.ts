import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const RegisterStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White100,
    alignItems: 'center',
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

  containerseller: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderColor: Colors.Black200,
    borderWidth: 1,
    marginVertical: 10,
  },

  button1: {
    alignItems: 'center',
    backgroundColor: Colors.Purple100,
    width: 327,
    paddingVertical: 11,
    borderRadius: 12,
    marginTop: 22,
  },

  button2: {
    marginTop: 34,
  },
});
