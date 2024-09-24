import React from 'react';
import {ScrollView} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamsList} from 'app/navigation/navigationTypes';
import {ProductPageStyles as styles} from './Product.styles';
import {ProductInfo} from 'features/ProductInfo';

type ProductProps = {
  route: RouteProp<RootStackParamsList, 'Product'>;
};

export const Product = ({route}: ProductProps) => {
  const {product} = route.params;

  return (
    <ScrollView style={styles.container}>
      <ProductInfo product={product} />
      {/* <Reviews/> */}
    </ScrollView>
  );
};
