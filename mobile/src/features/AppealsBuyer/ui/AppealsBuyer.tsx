import {Input, Modal} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

import {AppelsProduct} from 'entities';
import {CloseIcon} from 'shared/icons';

import {useAppealsBuyer} from '../model/store';
import {AppealsBuyerStyles as styles} from './AppealsBuyer.styles';

type AppealsBuyerProps = {
  product?: AppelsProduct;
};

export const AppealsBuyer = ({product}: AppealsBuyerProps) => {
  const {modalVisible, setModalVisible} = useAppealsBuyer();
  const [appealText, setAppealText] = useState('');
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
          <Text>{product && product.name}</Text>
          <Input
            placeholder="Ну давай пожалуйся на товар"
            value={appealText}
            onChangeText={nextValue => setAppealText(nextValue)}
            multiline
          />
          <Input
            placeholder="А пруфы есть?"
            value={appealText}
            onChangeText={nextValue => setAppealText(nextValue)}
            multiline
          />
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
