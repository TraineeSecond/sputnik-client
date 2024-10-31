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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  productTitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
});
