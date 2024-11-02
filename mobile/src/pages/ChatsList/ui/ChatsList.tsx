import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, FlatList, RefreshControl, View} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {ProfileStackParamsList} from 'app/navigation/navigationTypes';
import {Chat} from 'entities/chat';
import {useUserStore} from 'entities/user';
import {useChatListStore} from 'features/ChatList';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {ChatItem} from 'shared/ui';

import {ChatListStyles as styles} from './ChatsList.styles';

export const ChatsList = () => {
  const {chatList, setChatList, setSkip, loadChats, deleteChat} =
    useChatListStore();
  const {user} = useUserStore();
  const navigation = useAppNavigation();
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

  const handleChatPress = useCallback(
    (chatId: number, productName: string, sellerName: string) => {
      navigation.navigate(Screens.MESSENGER, {chatId, productName, sellerName});
    },
    [navigation],
  );

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
    const buyerParticipant =
      user.id === item?.participants[0]?.user?.id
        ? item.participants[0]
        : item.participants[1];
    const sellerParticipant =
      user.id !== item?.participants[0]?.user?.id
        ? item.participants[0]
        : item.participants[1];

    const chatPartner =
      user?.role === 'buyer'
        ? `${sellerParticipant?.user?.name} ${sellerParticipant?.user?.surname}`
        : `${buyerParticipant?.user?.name} ${buyerParticipant?.user?.surname}`;

    const lastMessage = item?.messages[0]?.message;
    const isYourMessage = item?.messages[0]?.authorId === user.id;

    const handleDelete = () => handleDeleteChat(item.id);
    const handlePress = () =>
      handleChatPress(item.id, item.product.name, chatPartner);

    return (
      <ChatItem
        viewBy={user.role}
        key={item.id.toString()}
        onDelete={handleDelete}
        onPress={handlePress}
        productImage={item.product?.images}
        productName={item.product.name}
        productPrice={item.product.price}
        chatPartner={chatPartner}
        lastMessage={lastMessage}
        isYourMessage={isYourMessage}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chatList}
        initialNumToRender={20}
        renderItem={renderChatItem}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
        onEndReached={onEndReached}
      />
    </View>
  );
};
