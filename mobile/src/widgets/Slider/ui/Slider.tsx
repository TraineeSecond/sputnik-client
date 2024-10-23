import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Category, Product} from 'entities';
import {Colors, TextStyles} from 'shared/libs/helpers';

import {SliderStyles as styles} from './Slider.styles';

type SliderProps = {
  title?: string;
  isLoading: boolean;
  data: Product[] | Category[];
  renderItem: ({item, index}: {item: any; index: number}) => ReactElement;
  renderSkeleton: (index: number) => ReactElement;
  style?: object;
};

export const Slider = ({
  title,
  data,
  style,
  isLoading,
  renderItem,
  renderSkeleton,
}: SliderProps) => {
  const {t} = useTranslation();
  const keyExtractor = (item: any, index: number) => index.toString();

  return (
    <View
      style={StyleSheet.compose(styles.container, style)}
      accessible={true}
      accessibilityLabel={title ? `Слайдер: ${title}` : 'Слайдер'}>
      {title && (
        <View style={styles.header}>
          <Text style={TextStyles.p2.changeColor(Colors.Black200)}>
            {title}
          </Text>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={`Посмотреть все ${title}`}>
            <Text style={TextStyles.span1.changeColor(Colors.Gray500)}>
              {t('Посмотреть все')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        horizontal
        data={isLoading ? [1, 2, 3, 4, 5] : data}
        keyExtractor={keyExtractor}
        renderItem={({item, index}) =>
          isLoading ? renderSkeleton(index) : renderItem({item, index})
        }
        initialNumToRender={5}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};
