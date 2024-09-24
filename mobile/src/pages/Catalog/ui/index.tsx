import React from 'react';
import {Text, ScrollView} from 'react-native';
import {CatalogPageStyles as styles} from './Catalog.styles';
import {useProductListStore} from 'entities/productList';

export const Catalog = () => {
  const {productList} = useProductListStore();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Catalog</Text>
    </ScrollView>
  );
};
