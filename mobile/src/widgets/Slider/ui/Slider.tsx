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

  // const renderSliderItem = ({item, index}) => (
  //   <View key={`${title}-${index}`}>{renderItem({item, index})}</View>
  // );
  const keyExtractor = (item: any, index: number) => index.toString();

  console.log(isLoading === true ? title : null);

  // TODO: Временно оставляю забагованный flatList в противном случае элементы не отображаются

  return (
    <View style={StyleSheet.compose(styles.container, style)}>
      {title && (
        <View style={styles.header}>
          <Text style={TextStyles.p2.changeColor(Colors.Black200)}>
            {title}
          </Text>
          <TouchableOpacity>
            <Text style={TextStyles.span1.changeColor(Colors.Gray500)}>
              {t('Посмотреть все')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {/* <ScrollView
        key={title}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}>
        {data.map((item, index) => (
          <View key={index}>{renderItem({item, index})}</View>
        ))}
      </ScrollView> */}

      {/* <ScrollView
        key={title}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}>
        {isLoading
          ? [1, 2, 3, 4, 5].map((_, index) => (
              <View key={index}>{renderSkeleton(index)}</View>
            ))
          : data.map((item, index) => (
              <View key={index}>{renderItem({item, index})}</View>
            ))}
      </ScrollView> */}

      <FlatList
        horizontal
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={5}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
      />

      {/* <View style={styles.flatList}>
        {isLoading
          ? [1, 2, 3, 4, 5].map((_, index) => (
              <View key={index}>{renderSkeleton(index)}</View>
            ))
          : data.map((item, index) => (
              <View key={index}>{renderItem({item, index})}</View>
            ))}
      </View> */}
    </View>
  );
};
