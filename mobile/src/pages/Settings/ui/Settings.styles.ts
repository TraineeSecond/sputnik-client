import {StyleSheet} from 'react-native';
import {Colors} from '../../../shared/libs/helpers/colors';

export const SettingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White100,
    padding: 20,
  },

  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
});
