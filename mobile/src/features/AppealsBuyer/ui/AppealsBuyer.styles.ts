import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const AppealsBuyerStyles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.Gray200,
    width: 350,
    height: 650,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: Colors.Black100Opacity20,
    borderRadius: 20,
    padding: 10,
  },
});
