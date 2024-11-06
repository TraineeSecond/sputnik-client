import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers';

export const AppealItemStyles = StyleSheet.create({
  remove: {
    position: 'absolute',
    top: 10,
    right: 10,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  acceptButton: {
    backgroundColor: Colors.Green500,
  },
  rejectButton: {
    backgroundColor: Colors.Red500,
  },
  buttonText: {
    color: Colors.White100,
    fontWeight: 'bold',
  },
});
