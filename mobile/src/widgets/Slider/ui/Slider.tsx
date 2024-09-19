import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {Colors, TextStyles} from 'shared/libs/helpers';

type SliderProps = {
  title?: string;
  data: any;
  renderItem: ({item, index}: {item: any; index: number}) => React.ReactElement;
  style?: object;
};

export const Slider = ({title, data, style, renderItem}: SliderProps) => {
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
      <FlatList
        horizontal
        data={data}
        initialNumToRender={5}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 10, paddingHorizontal: 10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 10,
  },
});
