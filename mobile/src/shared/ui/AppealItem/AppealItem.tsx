import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {Appeal} from 'entities/appeal';
import {TrashIcon} from 'shared/icons';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';

import {AppealItemStyles as styles} from './AppealItem.styles';

interface AppealItemProps {
  item: Appeal;
  onAccept?: () => Promise<void>;
  onReject?: () => Promise<void>;
  onPress?: () => void;
  hasDeleteButton?: boolean;
  hasNoAnswer?: boolean;
}

export const AppealItem = memo(
  ({
    item,
    onAccept,
    onReject,
    hasNoAnswer,
    onPress,
    hasDeleteButton,
  }: AppealItemProps) => {
    const {t} = useTranslation();

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

    return (
      <View style={styles.card}>
        {hasDeleteButton && (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={t('Удалить апелляцию')}
            style={styles.remove}
            onPress={onPress}>
            <TrashIcon
              fill={IconStyles.medium.changeColor(Colors.Gray500).color}
              width={IconStyles.medium.width}
              height={IconStyles.medium.height}
            />
          </TouchableOpacity>
        )}
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text
              accessibilityRole="text"
              accessibilityLabel={t('Название товара')}
              style={[
                TextStyles.p1.changeColor(Colors.Black100),
                styles.marginBottom,
              ]}>
              {item.product.name.trim()}
            </Text>
            <Text
              accessibilityRole="text"
              accessibilityLabel={t('Категория товара')}
              style={[
                TextStyles.p4.changeColor(Colors.Gray500),
                styles.marginBottom,
              ]}>
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
              accessibilityRole="text"
              accessibilityLabel={t('Описание проблемы с товаром')}
              style={[styles.marginBottom, TextStyles.p4]}
              numberOfLines={3}
              ellipsizeMode="tail">
              {item.problem}
            </Text>
          </View>
          {item.product.images && item.product.images[0]?.image ? (
            <Image
              accessibilityRole="image"
              accessibilityLabel={t('Картинка товара')}
              source={{uri: item.product.images[0]?.image as string}}
              style={styles.image}
            />
          ) : (
            <View
              accessibilityLabel={t('Изображение отсутствует')}
              style={styles.noImage}>
              <Text style={TextStyles.span1.changeColor(Colors.Gray500)}>
                {item.product.name}
              </Text>
            </View>
          )}
        </View>
        <ScrollView
          accessibilityRole="image"
          accessibilityLabel={t('Картинки проблемы')}
          horizontal
          style={styles.imageContainer}>
          {item.images.map(image => (
            <Image
              key={image.id}
              source={{uri: image.image}}
              style={styles.appealImage}
            />
          ))}
        </ScrollView>
        {hasNoAnswer && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={t('Принять апелляцию')}
              style={[styles.button, styles.acceptButton]}
              onPress={onAccept}>
              <Text style={styles.buttonText}>{t('Принять')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="image"
              accessibilityLabel={t('Отклонить апелляцию')}
              style={[styles.button, styles.rejectButton]}
              onPress={onReject}>
              <Text style={styles.buttonText}>{t('Отказать')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  },
);
