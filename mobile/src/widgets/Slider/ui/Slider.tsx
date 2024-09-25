import React, {ReactElement} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Colors, TextStyles} from 'shared/libs/helpers';
import {SliderStyles as styles} from './Slider.styles';
import {Category, Product} from 'entities';
import {useTranslation} from 'react-i18next';

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

  const renderSliderItem = (item: any, index: number) => (
    <View key={`${title}-${index}`}>{renderItem({item, index})}</View>
  );

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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}>
        {isLoading
          ? [1, 2, 3, 4, 5].map((_, index) => renderSkeleton(index))
          : data.map(renderSliderItem)}
      </ScrollView>
    </View>
  );
};
