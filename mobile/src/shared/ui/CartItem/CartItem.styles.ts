import {StyleSheet} from 'react-native';
import {Colors} from '../../../shared/libs/helpers/colors';

export const CartItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.White100,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.Gray100,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 10,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productSize: {
    marginBottom: 8,
  },
  productPrice: {
    fontWeight: 'bold',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: Colors.Green500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 18,
    color: Colors.Black100,
  },
  counterValue: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
