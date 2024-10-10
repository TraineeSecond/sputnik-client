import React from 'react';
import {View} from 'react-native';

import {ChatList} from 'features';

import {ChatsListStyles as styles} from './ChatsList.styles';

export const ChatsList = () => {
  return (
    <View style={styles.container}>
      <ChatList />
    </View>
  );
};
