import {Button, Modal} from '@ui-kitten/components';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';

import {CopyOutlineIcon, PenOutlineIcon, TrashIcon} from 'shared/icons';
import {Colors, IconStyles, emoji} from 'shared/libs/helpers';
import {Slider} from 'widgets';

import {MessageActionsModalStyles as styles} from './MessageActionsModal.styles';

interface MessageActionsModalProps {
  modalVisible: boolean;
  modalPosition: {x: number; y: number};
  handleCopy: () => void;
  onBackdropPress: () => void;
  handleDelete: () => void;
  handleUpdate: () => void;
  sendReaction: (reaction: string) => void;
}

export const MessageActionsModal = ({
  modalPosition,
  modalVisible,
  handleCopy,
  handleDelete,
  handleUpdate,
  sendReaction,
  onBackdropPress,
}: MessageActionsModalProps) => {
  const {t} = useTranslation();
  const emojiKeys = Object.keys(emoji) as Array<keyof typeof emoji>;

  const renderEmoji = ({item}: {item: keyof typeof emoji}) => {
    const handleSendReaction = () => {
      sendReaction(item);
    };

    return (
      <TouchableOpacity
        style={styles.reactionItem}
        onPress={handleSendReaction}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${t('Отправить реакцию')} ${emoji[item]}`}>
        <Text style={styles.emoji}>{emoji[item]}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={modalVisible}
      backdropStyle={styles.backdrop}
      style={[
        styles.modalContainer,
        {position: 'absolute', left: modalPosition.x, top: modalPosition.y},
      ]}
      onBackdropPress={onBackdropPress}
      accessible={true}
      accessibilityLabel={t('Выберите действие с сообщением')}>
      <Slider
        data={emojiKeys}
        renderItem={renderEmoji}
        renderSkeleton={() => <View style={styles.skeleton} />}
        isLoading={false}
        style={styles.slider}
      />

      <View style={styles.buttonsGroup}>
        <Button
          style={styles.button}
          onPress={handleCopy}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={t('Копировать сообщение')}>
          <>
            <CopyOutlineIcon
              fill={IconStyles.medium.changeColor(Colors.Gray500).color}
              width={IconStyles.medium.width}
              height={IconStyles.medium.height}
            />
            <Text>{t('Копировать')}</Text>
          </>
        </Button>
        <Button
          style={styles.button}
          onPress={handleUpdate}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={t('Изменить сообщение')}>
          <>
            <PenOutlineIcon
              fill={IconStyles.medium.changeColor(Colors.Gray500).color}
              width={IconStyles.medium.width}
              height={IconStyles.medium.height}
            />
            <Text>{t('Изменить')}</Text>
          </>
        </Button>
        <Button
          style={styles.button}
          onPress={handleDelete}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={t('Удалить сообщение')}>
          <>
            <TrashIcon
              fill={IconStyles.medium.changeColor(Colors.Gray500).color}
              width={IconStyles.medium.width}
              height={IconStyles.medium.height}
            />
            <Text>{t('Удалить')}</Text>
          </>
        </Button>
      </View>
    </Modal>
  );
};
