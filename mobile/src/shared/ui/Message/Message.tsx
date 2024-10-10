import React, {memo} from 'react';
import {Text, View} from 'react-native';

import {IMessage} from 'entities/chat';

import {MessageStyles as styles} from './Message.styles';

type MessageProps = {
  message: IMessage;
  isCurrentUser: boolean;
};

export const Message = memo(({message, isCurrentUser}: MessageProps) => {
  return (
    <View
      style={[
        styles.messageContainer,
        isCurrentUser
          ? styles.messageContainerRight
          : styles.messageContainerLeft,
      ]}>
      <View
        style={[
          styles.bubble,
          isCurrentUser ? styles.bubbleRight : styles.bubbleLeft,
        ]}>
        <Text
          style={[
            styles.messageText,
            isCurrentUser ? styles.messageTextRight : styles.messageTextLeft,
          ]}>
          {message.message}
        </Text>
      </View>
    </View>
  );
});
