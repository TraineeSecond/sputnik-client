import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers';

export const HeaderStyles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: Colors.White100,
    borderBottomWidth: 2,
    borderBottomColor: Colors.Gray100,
  },
});
