import {StyleSheet} from 'react-native';
import {Colors} from 'shared/libs/helpers/colors';

export const CartPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White100,
  },
  centerText: {
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    borderRadius: 10,
    width: 327,
    //backgroundColor: Colors.Green500,
    borderColor: Colors.Green500,
    alignSelf: 'center',
  },
});
