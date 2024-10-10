import React from 'react';
import {View} from 'react-native';

import {Chat} from 'features';

import {MessengerStyles as styles} from './Messenger.styles';

export const Messenger = () => {
  return <View style={styles.container}>{<Chat />}</View>;
};
