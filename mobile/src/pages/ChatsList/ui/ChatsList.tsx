import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, RefreshControl, View, VirtualizedList} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {ProfileStackParamsList} from 'app/navigation/navigationTypes';
import {Chat} from 'entities/chat';
import {useUserStore} from 'entities/user';
import {chats} from 'shared/assets/mockChats';
import {ChatItem} from 'shared/ui';

import {ChatListStyles as styles} from './ChatsList.styles';

export const ChatsList = () => {
  // const {chatList, loadChats, deleteChat, isLoading, error} = useChatListStore();
  const navigation = useNavigation<NavigationProp<ProfileStackParamsList>>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {t} = useTranslation();

  const handleDeleteChat = useCallback((chatId: number) => {
    Alert.alert(
      t('Удалить чат?'),
      t('Это действие невозможно отменить'),
      [
        {
          text: 'Да',
          onPress: () => {
            // deleteChat(chatId);
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
    setRefreshing(true);
    // loadChats(user.id);
    setRefreshing(false);
  };

  const getItem = (data: Chat[], index: number) => data[index];

  const getItemCount = (data: Chat[]) => data.length;

  const renderChatItem = ({item}: {item: Chat}) => {
    const handleDelete = () => handleDeleteChat(item.id);
    const handlePress = () => handleChatPress(item.id);
    const seller = `${item.product.user.name} ${item.product.user.surname}`;

    return (
      <ChatItem
        key={item.id.toString()}
        onDelete={handleDelete}
        onPress={handlePress}
        productImage={item.product.images[0].image}
        productName={item.product.name}
        productPrice={item.product.price}
        seller={seller}
      />
    );
  };

  return (
    <View style={styles.container}>
      <VirtualizedList
        data={chats}
        initialNumToRender={20}
        renderItem={renderChatItem}
        keyExtractor={item => item.id.toString()}
        getItemCount={getItemCount}
        getItem={getItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};
