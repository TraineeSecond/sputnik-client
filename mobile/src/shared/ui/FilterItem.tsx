import React, {memo} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import {Colors, TextStyles} from 'shared/libs/helpers';

type FilterItemProps = {
  item: {
    id: string;
    title: string;
    image: ImageSourcePropType;
  };
  onPress: () => void;
};

export const FilterItem = memo(
  ({item: {id, title, image}, onPress}: FilterItemProps) => {
    return (
      <TouchableOpacity
        id={id}
        onPress={onPress}
        style={styles.container}
        activeOpacity={1}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <Text
          style={TextStyles.span1.changeColor(Colors.Black200)}
          numberOfLines={1}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 5,
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
    height: 85,
    borderRadius: 100,
    backgroundColor: Colors.Gray200,
  },
  image: {
    width: 60,
    height: 60,
  },
});
