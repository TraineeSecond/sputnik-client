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
  seller: string;
  productName: string;
  productPrice: number;
  productImage?: ImageOwn[];
  onPress: () => void;
  onDelete: () => void;
};

export const ChatItem = memo(
  ({
    seller,
    productName,
    productImage,
    productPrice,
    onPress,
    onDelete,
  }: ChatItemProps) => {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.imageContainer}>
          {productImage ? (
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
            {seller}
          </Text>
          <Text
            style={TextStyles.span1.changeColor(Colors.Gray500)}
            numberOfLines={1}
            ellipsizeMode="tail">
            {productName}
          </Text>
          <Text style={TextStyles.span1.changeColor(Colors.Gray500)}>
            {productPrice}
          </Text>
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
