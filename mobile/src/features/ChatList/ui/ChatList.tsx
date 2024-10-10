import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {ProfileStackParamsList} from 'app/navigation/navigationTypes';
import {Chat} from 'entities/chat';
import {useUserStore} from 'entities/user';
import {chats} from 'shared/assets/mockChats';
import {ChatItem} from 'shared/ui';

import {useChatListStore} from '..';
import {ChatListStyles as styles} from './styles';

export const ChatList = () => {
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

  const handleChatPress = useCallback(
    (chatId: number) => {
      navigation.navigate(Screens.MESSENGER, {chatId});
    },
    [navigation],
  );

  const onRefresh = async () => {
    setRefreshing(true);
    // loadChats(user.id);
    setRefreshing(false);
  };

  const renderChatItem = ({item}: {item: Chat}) => {
    const handleDelete = () => handleDeleteChat(item.id);
    const handlePress = () => handleChatPress(item.id);
    const seller = `${item.product.user.name} ${item.product.user.surname}`;

    return (
      <ChatItem
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
      {/* {isLoading && <ActivityIndicator size="large" />} */}
      <FlatList
        data={chats}
        keyExtractor={item => item.id.toString()}
        renderItem={renderChatItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};
