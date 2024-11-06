import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export const OrdersPageStyles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  productItem: {
    width: width / 2 - 26,
    margin: 8,
  },
  toptext: {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    // marginBottom: 5,
  },
  ordersContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
