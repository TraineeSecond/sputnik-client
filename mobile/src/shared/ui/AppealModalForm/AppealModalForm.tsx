import {Button, Input, Modal} from '@ui-kitten/components';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {AppealsProduct, FormAppeal} from 'entities';
import {CloseCircleIcon, CloseIcon} from 'shared/icons';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';

import {AppealModalFormStyles as styles} from './AppealModalForm.styles';

type AppealModalFormProps = {
  product?: AppealsProduct;
  modalVisible: boolean;
  appealText: string;
  setAppealText: (value: string) => void;
  attachedImages: string[];
  handleSubmit: () => Promise<void>;
  handleAttachFile: () => void;
  removeImage: (imageToDelete: string) => void;
  closeModal: () => void;
};

export const AppealModalForm = ({
  product,
  modalVisible,
  appealText,
  setAppealText,
  attachedImages,
  handleSubmit,
  handleAttachFile,
  closeModal,
  removeImage,
}: AppealModalFormProps) => {
  const {t} = useTranslation();

  return (
    <Modal visible={modalVisible} animationType="slide">
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <TouchableOpacity
            onPress={closeModal}
            style={styles.modalClose}
            accessibilityRole="button"
            accessibilityLabel={t('Закрыть модальное окно')}>
            <CloseIcon />
          </TouchableOpacity>
          <View style={styles.modalHeader}>
            {product && product.image ? (
              <Image
                source={{uri: product.image}}
                style={styles.image}
                accessibilityRole="image"
                accessibilityLabel={t('Картинка товара')}
              />
            ) : (
              <View style={styles.noImage}>
                <Text
                  accessibilityRole="image"
                  accessibilityLabel={t('Изображение отсутствует')}
                  style={TextStyles.span1.changeColor(Colors.Gray500)}>
                  {product && product.name}
                </Text>
              </View>
            )}
            <View style={styles.productInfo}>
              <Text
                style={TextStyles.p1.changeColor(Colors.Black100)}
                numberOfLines={1}
                ellipsizeMode="tail"
                accessibilityRole="text"
                accessibilityLabel={t('Название товара')}>
                {product && product.name.trim()}
              </Text>
              <Text
                accessibilityRole="text"
                accessibilityLabel={t('Цена товара')}
                style={TextStyles.p2.changeColor(Colors.Black100)}>
                {product && product.price} ₽
              </Text>
            </View>
          </View>
          <Text style={TextStyles.p1.changeColor(Colors.Black100)}>
            {t('Опишите проблему')}
          </Text>
          <Input
            placeholder={t('Напишите, что произошло')}
            value={appealText}
            onChangeText={setAppealText}
            multiline
            style={[
              styles.inputField,
              TextStyles.p2.changeColor(Colors.Black100),
            ]}
          />
          <Text
            accessibilityRole="text"
            accessibilityLabel={t(
              'Прикрепите до 5 фото доказательств проблемы',
            )}
            style={TextStyles.p1.changeColor(Colors.Black100)}>
            {t('Прикрепите до 5 фото доказательств проблемы')}
          </Text>
          <View style={styles.imagesContainer}>
            {attachedImages.map((image, ix) => (
              <View key={ix} style={styles.previewImageWrapper}>
                <Image
                  accessibilityRole="image"
                  accessibilityLabel={t('Загруженное фото')}
                  source={{uri: image}}
                  style={styles.previewImage}
                />
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel={t('Удалить фото')}
                  onPress={() => removeImage(image)}
                  style={styles.closeButton}>
                  <CloseCircleIcon
                    fill={Colors.White100}
                    width={IconStyles.medium.width}
                    height={IconStyles.medium.height}
                  />
                </TouchableOpacity>
              </View>
            ))}
            {attachedImages.length < 5 && (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={t('Прикрепить фото')}
                onPress={handleAttachFile}
                style={styles.attachFilesButton}>
                <Text>+</Text>
              </TouchableOpacity>
            )}
          </View>
          <Button
            accessibilityRole="button"
            accessibilityLabel={t('Отправить апелляцию')}
            onPress={handleSubmit}
            disabled={!appealText.trim() || !attachedImages.length}>
            {t('Отправить апелляцию')}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};
