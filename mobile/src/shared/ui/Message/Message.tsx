import {Spinner} from '@ui-kitten/components';
import React, {memo, useCallback} from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';

import {Reactions} from 'entities';
import {AlertIcon, CheckIcon, DoubleCheckIcon} from 'shared/icons';
import {Colors, IconStyles, TextStyles, emoji} from 'shared/libs/helpers';

import {MessageStyles as styles} from './Message.styles';

type MessageProps = {
  message: string;
  isCurrentUser: boolean;
  reactions: Reactions[];
  onLongPress: () => void;
  onSendReaction: (reaction: string) => void;
  isSending: boolean;
  isRead?: boolean;
  hasError?: boolean;
};

export const Message = memo(
  ({
    message,
    isCurrentUser,
    onLongPress,
    reactions,
    onSendReaction,
    isSending,
    isRead,
    hasError,
  }: MessageProps) => {
    const renderIcon = () => {
      if (hasError) {
        return (
          <AlertIcon
            style={{
              width: IconStyles.small.width,
              height: IconStyles.small.height,
            }}
          />
        );
      }
      if (isSending)
        return (
          <Spinner
            style={{
              width: IconStyles.small.width,
              height: IconStyles.small.height,
            }}
          />
        );
      else {
        if (isRead)
          return (
            <DoubleCheckIcon
              fill={IconStyles.small.changeColor(Colors.Blue200).color}
              width={IconStyles.small.width}
              height={IconStyles.small.height}
            />
          );
        else
          return (
            <CheckIcon
              fill={IconStyles.small.changeColor(Colors.Blue200).color}
              width={IconStyles.small.width}
              height={IconStyles.small.height}
            />
          );
      }
    };

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
          <View style={styles.messageContent}>
            <Text
              style={[
                styles.messageText,
                isCurrentUser
                  ? styles.messageTextRight
                  : styles.messageTextLeft,
              ]}>
              {message}
            </Text>
            {reactions.length === 0 && isCurrentUser && (
              <View style={styles.inlineStatusIcon}>{renderIcon()}</View>
            )}
          </View>
          {reactions.length > 0 && (
            <View style={styles.reactionsAndStatusContainer}>
              <View style={styles.reactionsContainer}>
                {reactions.map((reaction, ix) => {
                  const onPress = () => onSendReaction(reaction.reaction);
                  return (
                    <TouchableOpacity
                      key={ix}
                      onPress={onPress}
                      style={styles.reaction}>
                      <Text
                        style={TextStyles.span1.changeColor(Colors.White100)}>
                        {emoji[reaction.reaction as keyof typeof emoji]}{' '}
                        {reaction.count}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {isCurrentUser && (
                <View style={styles.statusIcon}>{renderIcon()}</View>
              )}
            </View>
          )}
        </Pressable>
      </View>
    );
  },
);
