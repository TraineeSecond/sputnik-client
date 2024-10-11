import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {KeyboardAvoidingView, View, VirtualizedList} from 'react-native';

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

  // TODO: Получать это все из useChatStore

  // const {messages, currentMessage, loadMessages, sendMessage} = useChatStore()

  // TODO: Удалить / поменять
  const [message, setMessage] = useState('');

  const chat = chats.find(chat => chat.id === chatId)!;

  const messages = chat.messages;

  const currentUser = users[0];

  const handleSendMessage = () => {
    setMessage('');
  };

  const handleAttachFile = () => {};

  //-------------------------------------------------------

  const renderMessage = ({item}: {item: IMessage}) => {
    const isCurrentUser = item.authorId === currentUser.id;
    return <Message message={item.message} isCurrentUser={isCurrentUser} />;
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.messagesContainer}>
        <VirtualizedList
          data={messages}
          initialNumToRender={20}
          renderItem={renderMessage}
          keyExtractor={item => item.id.toString()}
          getItemCount={data => data.length}
          getItem={(data, index) => data[index]}
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
