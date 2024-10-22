import React, {memo} from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {ImageOwn} from 'entities/product';
import {TrashIcon} from 'shared/icons';
import {Colors, IconStyles, TextStyles} from 'shared/libs/helpers';

import {ChatItemStyles as styles} from './ChatItem.styles';

type ChatItemProps = {
  viewBy: string;
  lastMessage: string;
  productName: string;
  productPrice: number;
  chatPartner?: string;
  isYourMessage: boolean;
  productImage?: ImageOwn[];
  onPress: () => void;
  onDelete: () => void;
};

export const ChatItem = memo(
  ({
    viewBy,
    lastMessage,
    chatPartner,
    productName,
    productImage,
    productPrice,
    isYourMessage,
    onPress,
    onDelete,
  }: ChatItemProps) => {
    const renderLastMessage = () => {
      if (viewBy === 'buyer') {
        return `${isYourMessage ? 'Вы: ' : 'Продавец: '} ${lastMessage}`;
      } else {
        return `${isYourMessage ? 'Вы: ' : 'Покупатель: '} ${lastMessage}`;
      }
    };

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.imageContainer}>
          {productImage && productImage[0]?.image ? (
            <Image
              source={{uri: productImage[0].image as string}}
              style={styles.image}
            />
          ) : (
            <View style={styles.noImage}>
              <Text style={TextStyles.span1.changeColor(Colors.Gray500)}>
                {productName}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.detailsContainer}>
          <Text
            style={TextStyles.p1.changeColor(Colors.Black100)}
            numberOfLines={2}
            ellipsizeMode="tail">
            {chatPartner}
          </Text>
          <Text
            style={TextStyles.span1.changeColor(Colors.Black100)}
            numberOfLines={1}
            ellipsizeMode="tail">
            {productName} {productPrice} ₽
          </Text>
          {lastMessage && (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={TextStyles.span1.changeColor(Colors.Gray500)}>
              {renderLastMessage()}
            </Text>
          )}
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <TrashIcon
            fill={IconStyles.medium.changeColor(Colors.Gray500).color}
            width={IconStyles.medium.width}
            height={IconStyles.medium.height}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  },
);
