import React, {ReactElement} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {Colors, TextStyles} from 'shared/libs/helpers';
import {SliderStyles as styles} from './Slider.styles';
import {Filter, Product} from 'entities';

type SliderProps = {
  title?: string;
  data: Product[] | Filter[];
  renderItem: ({item, index}: {item: any; index: number}) => ReactElement;
  style?: object;
};

export const Slider = ({title, data, style, renderItem}: SliderProps) => {
  // const renderItemWrapper = ({item}) => (
  //   <View style={styles.itemContainer}>{renderItem({item})}</View>
  // );

  return (
    <View style={StyleSheet.compose(styles.container, style)}>
      {title && (
        <View style={styles.header}>
          <Text style={TextStyles.p2.changeColor(Colors.Black200)}>
            {title}
          </Text>
          <TouchableOpacity>
            <Text style={TextStyles.span1.changeColor(Colors.Gray500)}>
              Посмотреть все
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.flatList}>
        {data.map(item => (
          <View key={`${title}-${item.id}`} style={styles.itemContainer}>
            {renderItem({item})}
          </View>
        ))}
      </View>
      {/* <FlatList
        horizontal
        key={title}
        data={data}
        initialNumToRender={5}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        keyExtractor={item => `${title}-${item.id}`}
      /> */}
    </View>
  );
};
