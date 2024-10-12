import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, KeyboardAvoidingView, View, VirtualizedList} from 'react-native';

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
    editMessage,
    setMessages,
    deleteMessage,
    updatingMessageId,
    setUpdatingMessageId,
  } = useChatStore();

  const {user} = useUserStore();

  useEffect(() => {
    loadMessages(chatId);
  }, []);

  useEffect(() => {
    socket.emit('joinChat', chatId);

    socket.on('newMessage', newMessage => {
      setMessages([...messages, newMessage]);
    });

    socket.on('updatedMessage', messageData => {
      setMessages(
        messages.map(msg => (msg.id === messageData.id ? messageData : msg)),
      );
    });

    socket.on('deletedMessage', ({messageId}) => {
      setMessages(messages.filter(msg => msg.id !== messageId));
    });

    return () => {
      socket.emit('leaveChat', chatId);
      socket.off('newMessage');
      socket.off('updatedMessage');
      socket.off('deletedMessage');
    };
  }, [chatId, messages]);

  const handleSendOrUpdate = () => {
    if (updatingMessageId) {
      editMessage(chatId, updatingMessageId, currentMessage);
      setUpdatingMessageId(null);
    } else {
      sendMessage(chatId, user.id);
    }
    setCurrentMessage('');
  };

  const handleDeleteMessage = (messageId: number) => {
    deleteMessage(chatId, messageId);
  };

  const handleAttachFile = () => {};

  //-------------------------------------------------------

  const longPress = (messageId: number) => {
    const handleDelete = () => handleDeleteMessage(messageId);
    const handleUpdate = () => {
      const messageToEdit = messages.find(msg => msg.id === messageId);
      if (messageToEdit) {
        setCurrentMessage(messageToEdit.message);
        setUpdatingMessageId(messageToEdit.id);
      }
    };
    Alert.alert('Выберите действие', 'Что вы хотите сделать?', [
      {
        text: 'Изменить',
        onPress: handleUpdate,
      },
      {
        text: 'Удалить',
        onPress: handleDelete,
      },
      {
        text: 'Отмена',
      },
    ]);
  };

  const renderMessage = ({item}: {item: IMessage}) => {
    const isCurrentUser = item.authorId === user.id;
    const handleLongPress = () => longPress(item.id);
    return (
      <Message
        message={item.message}
        isCurrentUser={isCurrentUser}
        onLongPress={handleLongPress}
      />
    );
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
          onSendMessage={handleSendOrUpdate}
          onAttachFile={handleAttachFile}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
