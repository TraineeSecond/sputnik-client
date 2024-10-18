import React, {memo} from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';

import {Reactions} from 'entities';
import {emoji} from 'shared/libs/helpers';

import {MessageStyles as styles} from './Message.styles';

type MessageProps = {
  message: string;
  isCurrentUser: boolean;
  reactions: Reactions[];
  onLongPress: () => void;
  setSelectedReaction: (value: string) => void;
  onSendReaction: () => void;
};

export const Message = memo(
  ({
    message,
    isCurrentUser,
    onLongPress,
    reactions,
    onSendReaction,
    setSelectedReaction,
  }: MessageProps) => {
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

          <TouchableOpacity
            onPress={onSendReaction}
            style={styles.reactionsContainer}>
            {reactions.map((reaction, ix) => (
              <Text key={ix}>
                {emoji[reaction.reaction as keyof typeof emoji]}{' '}
                {reaction.count}
              </Text>
            ))}
          </TouchableOpacity>
        </Pressable>
      </View>
    );
  },
);
