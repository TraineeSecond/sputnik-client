import {StyleSheet} from 'react-native';

import {Colors} from '../../libs/helpers/colors';

export const ChatItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  imageContainer: {
    width: 80,
    height: 80,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  noImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {},
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  productName: {},
  price: {},
  seller: {},
  deleteButton: {
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {},
});
