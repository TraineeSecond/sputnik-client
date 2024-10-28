import React from 'react';
import {useTranslation} from 'react-i18next';
import {TextInput, TouchableOpacity, View} from 'react-native';

import {AddImgIcon, SendIcon} from 'shared/icons';
import {Colors, IconStyles} from 'shared/libs/helpers';

import {ChatTextareaStyles as styles} from './ChatTextarea.styles';

type ChatTextareaProps = {
  message: string;
  setMessage: (text: string) => void;
  onAttachFile: () => void;
  onSendMessage: () => void;
};

export const ChatTextarea = ({
  message,
  setMessage,
  onAttachFile,
  onSendMessage,
}: ChatTextareaProps) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onAttachFile}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={t('Прикрепить файл')}>
        <AddImgIcon
          fill={Colors.Gray500}
          width={IconStyles.medium.width}
          height={IconStyles.medium.height}
        />
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={t('Введите сообщение')}
          placeholderTextColor={Colors.Gray500}
          multiline
          value={message}
          onChangeText={setMessage}
          accessible={true}
          accessibilityLabel={t('Поле ввода сообщения')}
          accessibilityHint={t('Введите сообщение')}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={onSendMessage}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={t('Отправить сообщение')}>
        <SendIcon
          fill={Colors.Gray500}
          width={IconStyles.medium.width}
          height={IconStyles.medium.height}
        />
      </TouchableOpacity>
    </View>
  );
};
