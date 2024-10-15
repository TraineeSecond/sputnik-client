import React, {memo} from 'react';
import {Pressable, Text, View} from 'react-native';

import {MessageStyles as styles} from './Message.styles';

type MessageProps = {
  message: string;
  isCurrentUser: boolean;
  onLongPress: () => void;
};

export const Message = memo(
  ({message, isCurrentUser, onLongPress}: MessageProps) => {
    return (
      <View
        style={[
          styles.messageContainer,
          isCurrentUser
            ? styles.messageContainerRight
            : styles.messageContainerLeft,
        ]}>
        <Pressable
          style={({pressed}) => [
            styles.bubble,
            isCurrentUser ? styles.bubbleRight : styles.bubbleLeft,
            pressed &&
              (isCurrentUser
                ? styles.backGroundChangeRight
                : styles.backGroundChangeLeft),
          ]}
          onLongPress={onLongPress}>
          <Text
            style={[
              styles.messageText,
              isCurrentUser ? styles.messageTextRight : styles.messageTextLeft,
            ]}>
            {message}
          </Text>
        </Pressable>
      </View>
    );
  },
);
