import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, KeyboardAvoidingView, Text, View} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {RootStackParamsList} from 'app/navigation/navigationTypes';
import {IMessage, useChatStore} from 'entities/chat';
import {chats, users} from 'shared/assets/mockChats';
import {ChatTextarea, Message} from 'shared/ui';

import {ChatStyles as styles} from './styles';

type ProductRouteProp = RouteProp<RootStackParamsList, Screens.MESSENGER>;

export const Chat = () => {
  const route = useRoute<ProductRouteProp>();
  const {chatId} = route.params;
  // TODO: Получать это все из стора useChatStore
  // const {messages, currentMessage, loadMessages, sendMessage} = useChatStore()
  // TODO: Удалить / поменять
  const [message, setMessage] = useState('');

  const chat = chats.find(chat => chat.id === chatId)!;

  const sellerName = `${chat.product.user.name} ${chat.product.user.surname}`;

  const messages = chat.messages;

  const currentUser = users[0];

  // TODO: Удалить / поменять

  const handleSendMessage = () => {
    setMessage('');
  };

  const handleAttachFile = () => {};

  //---------

  const renderMessageItem = ({item}: {item: IMessage}) => {
    const isCurrentUser = item.authorId === currentUser.id;
    return <Message message={item} isCurrentUser={isCurrentUser} />;
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.messagesContainer}>
        <FlatList
          data={messages}
          keyExtractor={item => item.id.toString()}
          renderItem={renderMessageItem}
          contentContainerStyle={styles.contentContainer}
        />
        <ChatTextarea
          message={message}
          setMessage={setMessage}
          onSendMessage={handleSendMessage}
          onAttachFile={handleAttachFile}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
