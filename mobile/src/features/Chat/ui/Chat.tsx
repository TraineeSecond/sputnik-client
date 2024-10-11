import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, View, VirtualizedList} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {RootStackParamsList} from 'app/navigation/navigationTypes';
import {IMessage, useChatStore} from 'entities/chat';
import {useUserStore} from 'entities/user';
import {chats, users} from 'shared/assets/mockChats';
import {ChatTextarea, Message} from 'shared/ui';
import {io} from 'socket.io-client';

import {ChatStyles as styles} from './styles';

type ProductRouteProp = RouteProp<RootStackParamsList, Screens.MESSENGER>;

const socket = io('http://domennameabcdef.ru:5555');

export const Chat = () => {
  const route = useRoute<ProductRouteProp>();
  const {chatId} = route.params;
  const {
    messages,
    currentMessage,
    setCurrentMessage,
    loadMessages,
    sendMessage,
    setMessages,
  } = useChatStore();

  const {user} = useUserStore();

  useEffect(() => {
    loadMessages(chatId);
  }, []);

  useEffect(() => {
    // Присоединение к чату
    socket.emit('joinChat', chatId);

    // Обработчик новых сообщений
    socket.on('newMessage', newMessage => {
      setMessages([...messages, newMessage]);
    });

    // Очистка при размонтировании
    return () => {
      socket.emit('leaveChat', chatId);
      socket.off('newMessage');
    };
  }, [chatId]);

  const chat = chats.find(chat => chat.id === chatId)!;

  const currentUser = users[0];

  const handleSendMessage = () => {
    sendMessage(chatId, user.id);
  };

  const handleAttachFile = () => {};

  //-------------------------------------------------------

  const renderMessage = ({item}: {item: IMessage}) => {
    const isCurrentUser = item.authorId === user.id;
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
          message={currentMessage}
          setMessage={setCurrentMessage}
          onSendMessage={handleSendMessage}
          onAttachFile={handleAttachFile}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
