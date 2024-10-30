import {Modal} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';

import {AppelsProduct} from 'entities';
import {CloseIcon} from 'shared/icons';

import {useAppealsBuyer} from '../model/store';
import {AppealsBuyerStyles as styles} from './AppealsBuyer.styles';

type AppealsBuyerProps = {
  product?: AppelsProduct;
};

export const AppealsBuyer = ({product}: AppealsBuyerProps) => {
  const {modalVisible, setModalVisible} = useAppealsBuyer();

  const {t} = useTranslation();

  useEffect(() => {
    if (product?.id) setModalVisible(true);
  }, [product]);

  console.log(product);
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <>
      <View>
        <Text>123</Text>
      </View>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={closeModal}
            style={styles.modalClose}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={t('Закрыть изображение')}>
            <CloseIcon />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};
