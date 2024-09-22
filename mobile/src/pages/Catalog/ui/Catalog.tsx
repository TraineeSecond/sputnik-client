import React from 'react';
import {View, Text} from 'react-native';
import {CatalogPageStyles as styles} from './Catalog.styles';

export const Catalog = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Catalog</Text>
    </View>
  );
};
