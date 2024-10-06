import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const MapInfoStyles = StyleSheet.create({
  map: {
    flex: 1,
  },
  selectedPointContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    zIndex: 1,
  },
  selectedPointText: {
    textAlign: 'center',
  },
});
