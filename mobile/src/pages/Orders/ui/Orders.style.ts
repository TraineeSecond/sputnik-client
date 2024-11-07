import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export const OrdersPageStyles = StyleSheet.create({
  productItem: {
    margin: 8,
  },
  toptext: {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  ordersContainer: {
    padding: 10,
  },
});
