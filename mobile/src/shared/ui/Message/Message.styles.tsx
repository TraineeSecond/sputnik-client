import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers';

export const MessageStyles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  bubbleLeft: {
    backgroundColor: Colors.Gray200,
    borderTopLeftRadius: 0,
  },
  bubbleRight: {
    backgroundColor: Colors.Green300,
    borderTopRightRadius: 0,
  },
  backGroundChangeLeft: {
    backgroundColor: Colors.Gray100,
  },
  backGroundChangeRight: {
    backgroundColor: Colors.Green500,
  },
  messageContainerLeft: {
    justifyContent: 'flex-start',
  },
  messageContainerRight: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  messageText: {
    fontSize: 16,
  },
  messageTextLeft: {
    color: Colors.Black100,
  },
  messageTextRight: {
    color: Colors.White100,
  },
  reactionsContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 10,
    marginTop: 5,
  },
  reaction: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: Colors.Blue200,
  },
});
