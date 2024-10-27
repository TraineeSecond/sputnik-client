import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const ChatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White100,
  },
  centerText: {
    textAlign: 'center',
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
    backgroundColor: Colors.Gray200,
    width: 350,
    height: 550,
    padding: 20,
    borderRadius: 10,
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
  imageContainer: {
    flexDirection: 'row',
    // alignItems: 'flex-start',
    padding: 8,
  },
  previewImageWrapper: {
    position: 'relative',
    marginRight: 8,
  },
  previewImage: {
    width: 75,
    height: 75,
    borderRadius: 12,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 4,
  },
});
