import React, {memo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Modal, TouchableOpacity, View} from 'react-native';

import {AppealImages} from 'entities/appeal';
import {ArrowLeftIcon, ArrowRightIcon, CloseIcon} from 'shared/icons';

import {ModalFullImageStyles as styles} from './ModalFullImage.styles';

type ModalFullImageProps = {
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  images: AppealImages[];
};

export const ModalFullImage = memo(
  ({
    selectedImageIndex,
    setSelectedImageIndex,
    modalVisible,
    setModalVisible,
    images,
  }: ModalFullImageProps) => {
    const {t} = useTranslation();

    const closeModal = () => {
      setModalVisible(false);
    };

    const showNextImage = () => {
      if (selectedImageIndex < images.length - 1) {
        setSelectedImageIndex(selectedImageIndex + 1);
      }
    };

    const showPreviousImage = () => {
      if (selectedImageIndex > 0) {
        setSelectedImageIndex(selectedImageIndex - 1);
      }
    };

    return (
      <Modal
        visible={modalVisible}
        transparent={false}
        animationType="slide"
        accessible={true}
        accessibilityLabel={t('Просмотр изображения')}>
        <View style={styles.modalContainer}>
          <Image
            source={{uri: images[selectedImageIndex].image}}
            style={styles.modalImage}
            accessible={true}
            accessibilityLabel={t('Просматриваемое изображение')}
          />

          {selectedImageIndex > 0 && (
            <TouchableOpacity
              onPress={showPreviousImage}
              style={styles.arrowLeft}>
              <ArrowLeftIcon />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={closeModal} style={styles.modalClose}>
            <CloseIcon />
          </TouchableOpacity>
          {selectedImageIndex < images.length - 1 && (
            <TouchableOpacity onPress={showNextImage} style={styles.arrowRight}>
              <ArrowRightIcon />
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    );
  },
);
