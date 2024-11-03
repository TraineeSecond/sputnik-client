import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers';

export const AppealsBuyerStyles = StyleSheet.create({
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
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: Colors.White100,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.Black100,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  marginBottom: {
    marginBottom: 3,
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  appealImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginLeft: 10,
  },
});
