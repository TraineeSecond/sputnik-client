import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {ProfileStackParamsList} from 'app/navigation/navigationTypes';
import {Chat} from 'entities/chat';
import {useUserStore} from 'entities/user';
import {chats} from 'shared/assets/mockChats';
import {ChatItem} from 'shared/ui';

import {useChatListStore} from '..';
import {ChatListStyles as styles} from './styles';

export const ChatList = () => {
  const {chatList, loadChats, isLoading, error} = useChatListStore();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<ProfileStackParamsList>>();
  const {user} = useUserStore();

  const handleDeleteChat = (chatId: number) => {};

  const handleChatPress = (chatId: number) => {
    // navigation.navigate(Screens.CHAT, { chatId });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    loadChats(user.id);
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {/* {isLoading && <ActivityIndicator size="large" />} */}
      {/* <FlatList
        data={chatList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ChatItem
            chat={item}
            onDelete={handleDeleteChat}
            onPress={handleChatPress}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
      /> */}
    </View>
  );
};
