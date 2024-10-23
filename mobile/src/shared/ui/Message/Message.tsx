import {Spinner} from '@ui-kitten/components';
import React, {memo, useCallback} from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';

import {Reactions} from 'entities';
import {CheckIcon, DoubleCheckIcon} from 'shared/icons';
import {Colors, TextStyles, emoji} from 'shared/libs/helpers';

import {MessageStyles as styles} from './Message.styles';

type MessageProps = {
  message: string;
  isCurrentUser: boolean;
  reactions: Reactions[];
  onLongPress: () => void;
  onSendReaction: (reaction: string) => void;
  isSending: boolean;
};

export const Message = memo(
  ({
    message,
    isCurrentUser,
    onLongPress,
    reactions,
    onSendReaction,
    isSending,
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
          <View style={styles.reactionsContainer}>
            {reactions.map((reaction, ix) => {
              const onPress = () => onSendReaction(reaction.reaction);
              return (
                <TouchableOpacity
                  key={ix}
                  onPress={onPress}
                  style={styles.reaction}>
                  <Text style={TextStyles.span1.changeColor(Colors.White100)}>
                    {emoji[reaction.reaction as keyof typeof emoji]}{' '}
                    {reaction.count}
                  </Text>
                </TouchableOpacity>
              );
            })}
            {isCurrentUser && (
              <View style={styles.statusIcon}>
                {/* TODO:Попробвать такой же как и у реакций */}
                {isSending ? <Spinner /> : <DoubleCheckIcon fill={'#8080FF'} />}
              </View>
            )}
          </View>
        </Pressable>
      </View>
    );
  },
);
