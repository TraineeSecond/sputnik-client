import {StyleSheet} from 'react-native';
import {Colors} from 'shared/libs/helpers';

export const CategoryItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 5,
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
    height: 85,
    borderRadius: 100,
    backgroundColor: Colors.Gray200,
  },
  image: {
    width: 60,
    height: 60,
  },
});
