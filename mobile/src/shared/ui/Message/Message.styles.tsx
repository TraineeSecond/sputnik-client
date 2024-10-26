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
    backgroundColor: Colors.Green100Opacity30,
    borderTopRightRadius: 0,
  },
  backGroundChangeLeft: {
    backgroundColor: Colors.Gray100,
  },
  backGroundChangeRight: {
    backgroundColor: Colors.Green100,
  },
  messageContainerLeft: {
    justifyContent: 'flex-start',
  },
  messageContainerRight: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
  },
  messageTextLeft: {
    color: Colors.Black100,
  },
  messageTextRight: {
    color: Colors.Black100,
  },
  inlineStatusIcon: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: -7,
    marginBottom: -5,
  },
  reactionsContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 10,
    marginTop: 5,
  },
  reactionsAndStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  reaction: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: Colors.Blue200,
  },
  statusIcon: {
    marginLeft: 'auto',
    marginTop: 10,
    marginRight: -7,
    marginBottom: -5,
  },
  spaceBetween: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 10,
  },
});
