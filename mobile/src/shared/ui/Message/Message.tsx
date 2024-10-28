import {Spinner} from '@ui-kitten/components';
import React, {memo, useCallback, useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Reactions, TImages} from 'entities';
import {AlertIcon, CheckIcon, CloseIcon, DoubleCheckIcon} from 'shared/icons';
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
  images: TImages[];
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
    images,
  }: MessageProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

    const imagePress = (uri: string) => {
      setSelectedImage(uri);
      setModalVisible(true);
    };

    const closeModal = () => {
      setModalVisible(false);
    };

    return (
      <>
        <View
          style={[
            styles.messageContainer,
            isCurrentUser
              ? styles.messageContainerRight
              : styles.messageContainerLeft,
          ]}>
          {images && images.length > 0 && (
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {images.map((image, index) => {
                const handleImagePress = () => imagePress(image.image);
                return (
                  <Pressable key={index} onPress={handleImagePress}>
                    <Image
                      source={{uri: image.image}}
                      style={styles.messageImage}
                    />
                  </Pressable>
                );
              })}
            </ScrollView>
          )}
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

        <Modal visible={modalVisible} transparent={false} animationType="slide">
          <View style={styles.modalConatiner}>
            {selectedImage && (
              <Image source={{uri: selectedImage}} style={styles.modalImage} />
            )}
            <TouchableOpacity onPress={closeModal} style={styles.modalClose}>
              <CloseIcon />
            </TouchableOpacity>
          </View>
        </Modal>
      </>
    );
  },
);
