import React from 'react';
import {View} from 'react-native';

import {SellerProducts} from 'features';

import {SellerDashboardStyle as styles} from './SellerDashboard.styles';

export const SellerDashboard = () => {
  return (
    <View style={styles.container}>
      <SellerProducts />
    </View>
  );
};
