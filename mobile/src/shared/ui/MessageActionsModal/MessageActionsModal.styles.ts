import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const MessageActionsModalStyles = StyleSheet.create({
  modalContainer: {
    width: 300,
    gap: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    overflow: 'hidden',
    borderRadius: 100,
    height: 40,
    backgroundColor: Colors.Gray200,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  buttonsGroup: {
    width: 200,
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.Gray200,
  },
  button: {
    paddingLeft: 15,
    borderRadius: 0,
    borderWidth: 0,
    justifyContent: 'flex-start',
    gap: 15,
    backgroundColor: Colors.Gray200,
  },
  reactionItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  skeleton: {
    height: 24,
    width: 24,
    borderRadius: 10,
    backgroundColor: Colors.Gray200,
  },
});
