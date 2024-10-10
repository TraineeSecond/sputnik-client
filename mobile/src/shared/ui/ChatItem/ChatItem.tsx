import React, {memo} from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Chat} from 'entities/chat';
import {ImageOwn} from 'entities/product';
import {RemoveIcon} from 'shared/icons';
import {Colors, TextStyles} from 'shared/libs/helpers';

import {ChatItemStyles as styles} from './ChatItem.styles';

type ChatItemProps = {
  chatId: number;
  productImage: ImageSourcePropType;
  productName: string;
  productPrice: number;
  seller: string;
  onDelete: (chatId: number) => void;
  onPress: (chatId: number) => void;
};

export const ChatItem = memo(
  ({
    chatId,
    productImage,
    productName,
    productPrice,
    seller,
    onDelete,
    onPress,
  }: ChatItemProps) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onPress(chatId)}>
        <View style={styles.imageContainer}>
          {productImage ? (
            <Image source={productImage} style={styles.image} />
          ) : (
            <View style={styles.noImage}>
              <Text style={styles.noImageText}>{productName}</Text>
            </View>
          )}
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{productName}</Text>
          <Text style={styles.price}>{productPrice}</Text>
          <Text style={styles.seller}>{seller}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(chatId)}>
          <Text style={styles.deleteButtonText}>Удалить</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  },
);
