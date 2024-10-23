import React from 'react';
import {Text, View} from 'react-native';

import {Colors, TextStyles} from 'shared/libs/helpers';

import {ShowErrorStyles as styles} from './ShowError.styles';

type ShowErrorProps = {
  textError: string;
};

export const ShowError = ({textError}: ShowErrorProps) => (
  <View
    style={styles.loaderContainer}
    accessible={true}
    accessibilityLabel={`Ошибка: ${textError}`}
    accessibilityRole="alert">
    <Text style={TextStyles.p1.changeColor(Colors.Red500)}>{textError}</Text>
  </View>
);
