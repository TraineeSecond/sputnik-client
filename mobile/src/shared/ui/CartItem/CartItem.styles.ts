import {StyleSheet} from 'react-native';

import {Colors} from '../../../shared/libs/helpers/colors';

export const CartItemStyles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.White100,
    borderRadius: 10,
    marginVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: Colors.Gray100,
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
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.Gray100,
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
  productPrice: {
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
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
  counterValue: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
