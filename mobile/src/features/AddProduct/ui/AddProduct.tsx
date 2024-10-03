import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';

import {AddProductStyles as styles} from './styles';

export const AddProduct = () => {
  const {t} = useTranslation();

  return <View style={styles.container}></View>;
};
