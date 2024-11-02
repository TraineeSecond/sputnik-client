import {Button, Input, Modal} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {AppelsProduct, FormAppeal} from 'entities';
import {useUserStore} from 'entities/user';
import {launchImageLibrary} from 'react-native-image-picker';
import {CloseCircleIcon, CloseIcon} from 'shared/icons';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';

import {useAppealsBuyer} from '../model/store';
import {AppealsBuyerStyles as styles} from './AppealsBuyer.styles';

type AppealsBuyerProps = {
  product?: AppelsProduct;
};

export const AppealsBuyer = ({product}: AppealsBuyerProps) => {
  const {
    modalVisible,
    setModalVisible,
    appealText,
    setAppealText,
    setAttachedImages,
    attachedImages,
    sendAppeal,
    appeals,
    getAppeals,
  } = useAppealsBuyer();

  const {t} = useTranslation();
  const {user} = useUserStore();

  useEffect(() => {
    if (product?.id) setModalVisible(true);
  }, [product]);

  useEffect(() => {
    getAppeals(user.id);
  }, [user.id]);

  console.log(appeals);

  const closeModal = () => {
    setModalVisible(false);
    setAppealText('');
    setAttachedImages([]);
  };

  const handleSubmit = () => {
    // TODO: отправка апелляции
    if (product) {
      const formatedAppel: FormAppeal = {
        productId: product.id,
        sellerId: product.sellerId,
        buyerId: user.id,
        images: attachedImages,
        problem: appealText,
      };
      console.log('formatedAppel', formatedAppel);
      console.log('product', product);
      sendAppeal(formatedAppel);
      // closeModal();
    }
  };

  const handleAttachFile = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 5,
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          const newImages: string[] = response.assets.map(
            asset => asset.uri || '',
          );

          setAttachedImages([...attachedImages, ...newImages]);
        }
      },
    );
  };

  const removeImage = (imageDelete: string) => {
    const newImages = attachedImages.filter(image => image !== imageDelete);
    setAttachedImages(newImages);
  };

  return (
    <>
      {/* TODO:ренденр апелляций */}
      <Text>123123</Text>
      {appeals.length > 0 &&
        appeals.map(appeal => <Text key={appeal.id}>{appeal.problem}</Text>)}
      <Text>ХУЙХУЙХУХЙУХ</Text>
      <Modal visible={modalVisible} animationType="slide">
        <KeyboardAvoidingView>
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <TouchableOpacity onPress={closeModal} style={styles.modalClose}>
              <CloseIcon />
            </TouchableOpacity>
            <View style={styles.modalHeader}>
              {product && product.image ? (
                <Image source={{uri: product.image}} style={styles.image} />
              ) : (
                <View style={styles.noImage}>
                  <Text style={TextStyles.span1.changeColor(Colors.Gray500)}>
                    {product && product.name}
                  </Text>
                </View>
              )}
              <View style={styles.productInfo}>
                <Text
                  style={TextStyles.p1.changeColor(Colors.Black100)}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {product && product.name.trim()}
                </Text>
                <Text style={TextStyles.p2.changeColor(Colors.Black100)}>
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

            <Text style={TextStyles.p1.changeColor(Colors.Black100)}>
              {t('Прикрепите до 5 фото доказательств проблемы')}
            </Text>
            <View style={styles.imagesContainer}>
              {attachedImages.map((image, ix) => {
                const handleRemoveImage = () => removeImage(image);
                return (
                  <View key={ix} style={styles.previewImageWrapper}>
                    <Image source={{uri: image}} style={styles.previewImage} />
                    <TouchableOpacity
                      onPress={handleRemoveImage}
                      style={styles.closeButton}>
                      <CloseCircleIcon
                        fill={Colors.White100}
                        width={IconStyles.medium.width}
                        height={IconStyles.medium.height}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
              {attachedImages.length < 5 && (
                <TouchableOpacity
                  onPress={handleAttachFile}
                  style={styles.attachFilesButton}>
                  <Text>+</Text>
                </TouchableOpacity>
              )}
            </View>

            <Button
              onPress={handleSubmit}
              disabled={!appealText.trim()}
              style={styles.submitButton}>
              {t('Отправить апелляцию')}
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};
