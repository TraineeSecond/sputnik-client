import React, {useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, FlatList, RefreshControl, View} from 'react-native';

import {Appeal, AppealsProduct, FormAppeal} from 'entities';
import {useUserStore} from 'entities/user';
import {launchImageLibrary} from 'react-native-image-picker';
import {AppealItem, AppealModalForm} from 'shared/ui';

import {useAppealsBuyer} from '../model/store';
import {AppealsBuyerStyles as styles} from './AppealsBuyer.styles';

type AppealsBuyerProps = {
  product?: AppealsProduct;
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
    refreshing,
    setRefreshing,
    deleteAppeal,
  } = useAppealsBuyer();

  const {t} = useTranslation();
  const {user} = useUserStore();

  useEffect(() => {
    if (product?.id) setModalVisible(true);
  }, [product]);

  useEffect(() => {
    getAppeals(user.id);
  }, [user.id]);

  const closeModal = () => {
    setModalVisible(false);
    setAppealText('');
    setAttachedImages([]);
  };

  const handleSubmit = async () => {
    if (product) {
      const formatedAppel: FormAppeal = {
        productId: product.id,
        sellerId: product.sellerId,
        buyerId: user.id,
        images: attachedImages,
        problem: appealText,
      };
      sendAppeal(formatedAppel);
      closeModal();
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

  const handleDeleteAppeal = useCallback((appealId: number) => {
    Alert.alert(
      t('Удалить апелляцию?'),
      t('Это действие невозможно отменить'),
      [
        {
          text: t('Да'),
          onPress: () => {
            deleteAppeal(appealId);
          },
        },
        {
          text: t('Отмена'),
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  }, []);

  const renderCardAppeal = ({item}: {item: Appeal}) => {
    const onPress = () => {
      handleDeleteAppeal(item.id);
    };

    return <AppealItem hasDeleteButton item={item} onPress={onPress} />;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    getAppeals(user.id);
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={appeals}
        initialNumToRender={20}
        renderItem={renderCardAppeal}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <AppealModalForm
        product={product}
        modalVisible={modalVisible}
        appealText={appealText}
        setAppealText={setAppealText}
        attachedImages={attachedImages}
        handleSubmit={handleSubmit}
        handleAttachFile={handleAttachFile}
        closeModal={closeModal}
        removeImage={removeImage}
      />
    </View>
  );
};
