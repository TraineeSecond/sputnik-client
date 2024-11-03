import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers';

export const AppealModalFormStyles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.Gray200,
    flexGrow: 1,
    width: 350,
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  remove: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalHeader: {
    flex: 1,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  productInfo: {
    flex: 1,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 10,
    marginRight: 16,
  },
  noImage: {
    padding: 5,
    width: 85,
    height: 85,
    borderRadius: 10,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.Gray500,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  inputField: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.Gray300,
    padding: 10,
    borderRadius: 8,
    backgroundColor: Colors.White100,
    maxHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  submitButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
  },
  modalClose: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: Colors.Black100Opacity20,
    borderRadius: 20,
    padding: 10,
  },
  attachFilesButton: {
    width: '31%',
    height: 80,
    borderRadius: 10,
    backgroundColor: Colors.Black100Opacity20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    position: 'relative',
  },
  previewImageWrapper: {
    position: 'relative',
    width: '31%',
    marginBottom: 10,
  },

  previewImage: {
    width: '100%',
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
  },

  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 4,
  },
});
