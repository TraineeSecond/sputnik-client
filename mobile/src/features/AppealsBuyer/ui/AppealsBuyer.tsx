import {Button, Input, Modal} from '@ui-kitten/components';
import React, {useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Appeal, AppealsProduct, FormAppeal} from 'entities';
import {useUserStore} from 'entities/user';
import {launchImageLibrary} from 'react-native-image-picker';
import {CloseCircleIcon, CloseIcon, RemoveIcon, TrashIcon} from 'shared/icons';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';

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

  console.log(user.id);

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
          text: 'Да',
          onPress: () => {
            deleteAppeal(appealId);
          },
        },
        {
          text: 'Отмена',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  }, []);

  const renderCardAppeal = ({item}: {item: Appeal}) => {
    const getStatusColor = (status: Appeal['status']) => {
      switch (status) {
        case 'pending':
          return Colors.Yellow500;
        case 'rejected':
          return Colors.Red500;
        case 'accepted':
          return Colors.Green500;
      }
    };

    const handleDelete = () => handleDeleteAppeal(item.id);

    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={handleDelete} style={styles.remove}>
          <TrashIcon
            fill={IconStyles.medium.changeColor(Colors.Gray500).color}
            width={IconStyles.medium.width}
            height={IconStyles.medium.height}
          />
        </TouchableOpacity>
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text
              style={[
                TextStyles.p1.changeColor(Colors.Black100),
                styles.marginBottom,
              ]}
              accessibilityLabel={t('Название товара')}>
              {item.product.name.trim()}
            </Text>
            <Text
              style={[
                TextStyles.p4.changeColor(Colors.Gray500),
                styles.marginBottom,
              ]}
              accessibilityLabel={t('Категория товара')}>
              {item.product.category}
            </Text>
            <View
              style={[
                styles.status,
                {backgroundColor: getStatusColor(item.status)},
              ]}
              accessibilityLabel={t('Статус апелляции')}>
              <Text style={TextStyles.span2}>
                {item.status === 'pending'
                  ? t('Отправлено')
                  : item.status === 'rejected'
                  ? t('Отказано')
                  : t('Принято')}
              </Text>
            </View>
            <Text
              style={[styles.marginBottom, TextStyles.p4]}
              numberOfLines={3}
              ellipsizeMode="tail"
              accessibilityLabel={t('Описание проблемы')}>
              {item.problem}
            </Text>
          </View>
          {item.product.images && item.product.images[0]?.image ? (
            <Image
              source={{uri: item.product.images[0]?.image as string}}
              style={styles.image}
              accessibilityLabel={t('Изображение товара', {
                productName: item.product.name.trim(),
              })}
            />
          ) : (
            <View style={styles.noImage}>
              <Text
                style={TextStyles.span1.changeColor(Colors.Gray500)}
                accessibilityLabel={t('Изображение отсутствует', {
                  productName: item.product.name,
                })}>
                {item.product.name}
              </Text>
            </View>
          )}
        </View>
        <ScrollView
          horizontal
          style={styles.imageContainer}
          accessibilityLabel={t('Изображения апелляции')}>
          {item.images.map(image => (
            <Image
              key={image.id}
              source={{uri: image.image}}
              style={styles.appealImage}
            />
          ))}
        </ScrollView>
      </View>
    );
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
                  accessibilityLabel={t('Фото товара')}
                />
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
            <Text
              style={TextStyles.p1.changeColor(Colors.Black100)}
              accessibilityRole="text"
              accessibilityLabel={t('Опишите проблему')}>
              {t('Опишите проблему')}
            </Text>
            <Input
              accessible={true}
              accessibilityLabel={t('Поле ввода проблемы')}
              accessibilityHint={t('Напишите, что произошло')}
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
              style={TextStyles.p1.changeColor(Colors.Black100)}
              accessibilityRole="text"
              accessibilityLabel={t(
                'Прикрепите до 5 фото доказательств проблемы',
              )}>
              {t('Прикрепите до 5 фото доказательств проблемы')}
            </Text>
            <View style={styles.imagesContainer}>
              {attachedImages.map((image, ix) => {
                const handleRemoveImage = () => removeImage(image);
                return (
                  <View key={ix} style={styles.previewImageWrapper}>
                    <Image
                      source={{uri: image}}
                      accessibilityRole="image"
                      accessibilityLabel={t('Загруженное фото')}
                      style={styles.previewImage}
                    />
                    <TouchableOpacity
                      onPress={handleRemoveImage}
                      style={styles.closeButton}
                      accessibilityRole="button"
                      accessibilityLabel={t('Удалить фото')}>
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
                  style={styles.attachFilesButton}
                  accessibilityRole="button"
                  accessibilityLabel={t('Прикрепить файл')}>
                  <Text>+</Text>
                </TouchableOpacity>
              )}
            </View>

            <Button
              onPress={handleSubmit}
              disabled={!appealText.trim() || attachedImages.length === 0}
              style={styles.submitButton}
              accessibilityRole="button"
              accessibilityLabel={t('Отправить апелляцию')}>
              {t('Отправить апелляцию')}
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};
