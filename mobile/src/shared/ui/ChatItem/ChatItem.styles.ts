import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const ChatItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray200,
  },
  imageContainer: {
    width: 80,
    height: 80,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: Colors.Gray200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  noImage: {
    padding: 5,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 4,
  },
});
