import React from 'react';
import {View, Text} from 'react-native';
import {TextStyles, Colors} from 'shared/libs/helpers';
import {ShowErrorStyles as styles} from './ShowError.styles';

type ShowErrorProps = {
  textError: string;
};

export const ShowError = ({textError}: ShowErrorProps) => (
  <View style={styles.loaderContainer}>
    <Text style={TextStyles.p1.changeColor(Colors.Red500)}>{textError}</Text>
  </View>
);
