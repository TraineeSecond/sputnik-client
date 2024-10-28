import {Spinner} from '@ui-kitten/components';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';

import {Reactions} from 'entities';
import {AlertIcon, CheckIcon, DoubleCheckIcon} from 'shared/icons';
import {Colors, IconStyles, TextStyles, emoji} from 'shared/libs/helpers';

import {MessageStyles as styles} from './Message.styles';

type MessageProps = {
  isRead?: boolean;
  message: string;
  isSending: boolean;
  hasError?: boolean;
  isCurrentUser: boolean;
  reactions: Reactions[];
  onLongPress: () => void;
  onSendReaction: (reaction: string) => void;
};

export const Message = memo(
  ({
    isRead,
    message,
    hasError,
    reactions,
    isSending,
    isCurrentUser,
    onLongPress,
    onSendReaction,
  }: MessageProps) => {
    const {t} = useTranslation();

    const renderIcon = () => {
      if (hasError) {
        return (
          <AlertIcon
            style={{
              width: IconStyles.small.width,
              height: IconStyles.small.height,
            }}
            accessible={true}
            accessibilityLabel={t('Ошибка отправки сообщения')}
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
            accessible={true}
            accessibilityLabel={t('Сообщение отправляется')}
          />
        );
      else {
        if (isRead)
          return (
            <DoubleCheckIcon
              fill={IconStyles.small.changeColor(Colors.Blue200).color}
              width={IconStyles.small.width}
              height={IconStyles.small.height}
              accessible={true}
              accessibilityLabel={t('Сообщение прочитано')}
            />
          );
        else
          return (
            <CheckIcon
              fill={IconStyles.small.changeColor(Colors.Blue200).color}
              width={IconStyles.small.width}
              height={IconStyles.small.height}
              accessible={true}
              accessibilityLabel={t('Сообщение доставлено')}
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
        ]}
        accessible={true}
        accessibilityLabel={
          isCurrentUser ? t('Ваше сообщение') : t('Сообщение от собеседника')
        }>
        <Pressable
          style={({pressed}) => [
            styles.bubble,
            isCurrentUser ? styles.bubbleRight : styles.bubbleLeft,
            pressed &&
              (isCurrentUser
                ? styles.backGroundChangeRight
                : styles.backGroundChangeLeft),
          ]}
          onLongPress={onLongPress}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={t('Нажмите и удерживайте для реакции')}>
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
                      style={styles.reaction}
                      accessible={true}
                      accessibilityRole="button"
                      accessibilityLabel={`${t('Реакция')} ${
                        emoji[reaction.reaction as keyof typeof emoji]
                      }`}>
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
