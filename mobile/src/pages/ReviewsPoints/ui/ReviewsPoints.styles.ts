import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const ReviewsPointsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  pointContainer: {
    borderWidth: 1,
    borderColor: Colors.Gray300,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: Colors.White100,
  },
  pointName: {
    marginBottom: 5,
  },
  pointRating: {
    fontSize: 14,
    color: Colors.Gray500,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.White100,
    padding: 30,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.Black100,
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  submitButtonText: {
    color: Colors.White100,
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: Colors.Gray500,
    fontSize: 16,
  },
});
