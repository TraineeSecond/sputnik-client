import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const MessageActionsModalStyles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.Gray200,
    width: 350,
    height: 550,
    padding: 20,
    borderRadius: 10,
  },
  centerText: {
    textAlign: 'center',
  },
  emojiListContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    paddingBottom: 20,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonsGroup: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  margin: {
    marginBottom: 10,
  },
  reactionItem: {
    width: 50,
    height: 50,
  },
});
