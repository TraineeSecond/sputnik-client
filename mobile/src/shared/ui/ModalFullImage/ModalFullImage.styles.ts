import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers';

export const ModalFullImageStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  modalClose: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: Colors.Black100Opacity20,
    borderRadius: 20,
    padding: 10,
  },
  arrowLeft: {
    position: 'absolute',
    left: 20,
    backgroundColor: Colors.Black100Opacity20,
    borderRadius: 20,
    padding: 10,
  },
  arrowRight: {
    position: 'absolute',
    right: 20,
    backgroundColor: Colors.Black100Opacity20,
    borderRadius: 20,
    padding: 10,
  },
});
