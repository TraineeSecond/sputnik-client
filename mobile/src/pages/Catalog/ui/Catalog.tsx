import React from 'react';
import {View, Text} from 'react-native';
import {CatalogPageStyles as styles} from './Catalog.styles';

const Catalog = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Catalog</Text>
    </View>
  );
};

export default Catalog;
