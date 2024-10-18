import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const ChatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White100,
  },
  messagesContainer: {
    flex: 1,
    position: 'relative',
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  modalContainer: {
    width: 320,
    height: 800,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
