import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, RefreshControl, View, VirtualizedList} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {ProfileStackParamsList} from 'app/navigation/navigationTypes';
import {Chat} from 'entities/chat';
import {useUserStore} from 'entities/user';
import {useChatListStore} from 'features/ChatList';
import {ChatItem} from 'shared/ui';

import {ChatListStyles as styles} from './ChatsList.styles';

export const ChatsList = () => {
  const {chatList, setChatList, setSkip, loadChats, deleteChat} =
    useChatListStore();
  const {user} = useUserStore();
  const navigation = useNavigation<NavigationProp<ProfileStackParamsList>>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {t} = useTranslation();

  useEffect(() => {
    loadChats(user.id);
  }, []);
  const handleDeleteChat = useCallback((chatId: number) => {
    Alert.alert(
      t('Удалить чат?'),
      t('Это действие невозможно отменить'),
      [
        {
          text: 'Да',
          onPress: () => {
            deleteChat(chatId);
          },
        },
        {
          text: 'Отмена',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  }, []);

  const handleChatPress = useCallback((chatId: number) => {
    navigation.navigate(Screens.MESSENGER, {chatId});
  }, []);

  const onRefresh = async () => {
    setChatList([]);
    setSkip(0);
    setRefreshing(true);
    loadChats(user.id);
    setRefreshing(false);
  };

  const onEndReached = async () => {
    await loadChats(user.id);
  };

  const renderChatItem = ({item}: {item: Chat}) => {
    const handleDelete = () => handleDeleteChat(item.id);
    const handlePress = () => handleChatPress(item.id);
    const seller = `${item.product.user.name} ${item.product.user.surname}`;
    const lastMessage = item?.messages[0]?.message;
    const isUserMessage = item?.messages[0]?.authorId === user.id;

    return (
      <ChatItem
        key={item.id.toString()}
        onDelete={handleDelete}
        onPress={handlePress}
        productImage={item.product?.images}
        productName={item.product.name}
        productPrice={item.product.price}
        seller={seller}
        lastMessage={lastMessage}
        isUserMessage={isUserMessage}
      />
    );
  };

  return (
    <View style={styles.container}>
      <VirtualizedList
        data={chatList}
        initialNumToRender={20}
        renderItem={renderChatItem}
        keyExtractor={item => item.id.toString()}
        getItemCount={data => data.length}
        getItem={(data, index) => data[index]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
        onEndReached={onEndReached}
      />
    </View>
  );
};
