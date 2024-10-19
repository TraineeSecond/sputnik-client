import {Button, Modal} from '@ui-kitten/components';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {Colors, TextStyles, emoji} from 'shared/libs/helpers';

import {MessageActionsModalStyles as styles} from './MessageActionsModal.styles';

interface MessageActionsModalProps {
  modalVisible: boolean;
  onBackdropPress: () => void;
  handleDelete: () => void;
  handleUpdate: () => void;
  sendReaction: (reaction: string) => void;
}

export const MessageActionsModal = ({
  modalVisible,
  onBackdropPress,
  handleDelete,
  handleUpdate,
  sendReaction,
}: MessageActionsModalProps) => {
  const {t} = useTranslation();
  const emojiKeys = Object.keys(emoji) as Array<keyof typeof emoji>;

  return (
    <Modal
      visible={modalVisible}
      backdropStyle={styles.backdrop}
      style={styles.modalContainer}
      onBackdropPress={onBackdropPress}>
      <Text
        style={[styles.centerText, TextStyles.h2.changeColor(Colors.Black100)]}>
        {t('Выберите реакцию')}
      </Text>

      <ScrollView contentContainerStyle={styles.emojiListContainer}>
        {emojiKeys.map((reaction, ix) => {
          const handleSendReaction = () => {
            sendReaction(reaction);
          };

          return (
            <TouchableOpacity
              style={styles.reactionItem}
              key={ix}
              onPress={handleSendReaction}>
              <Text style={TextStyles.reaction.changeColor(Colors.White100)}>
                {emoji[reaction]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.buttonsGroup}>
        <Button style={styles.margin} onPress={handleUpdate}>
          {t('Изменить')}
        </Button>
        <Button style={styles.margin} onPress={handleDelete}>
          {t('Удалить')}
        </Button>
        <Button style={styles.margin} onPress={onBackdropPress}>
          {t('Отмена')}
        </Button>
      </View>
    </Modal>
  );
};
