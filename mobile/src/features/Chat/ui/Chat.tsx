import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo} from 'react';
import {Alert, KeyboardAvoidingView, View, VirtualizedList} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {RootStackParamsList} from 'app/navigation/navigationTypes';
import {IMessage, useChatStore} from 'entities/chat';
import {useUserStore} from 'entities/user';
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
    setSkip,
    wasScroll,
    setWasScroll,
    isLoading,
  } = useChatStore();

  const {user} = useUserStore();

  const listRef = React.useRef<VirtualizedList<IMessage>>(null);

  const reversedMessages = useMemo(() => [...messages].reverse(), [messages]);

  useEffect(() => {
    loadMessages(chatId);

    return () => {
      setMessages([]);
      setSkip(0);
      setWasScroll(false);
    };
  }, [chatId]);

  useEffect(() => {
    socket.emit('joinChat', chatId);

    socket.on('newMessage', newMessage => {
      setMessages([newMessage, ...messages]);
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
  }, [messages]);

  useEffect(() => {
    if (!wasScroll && !isLoading && messages.length > 0) {
      scrollToEnd();
      setWasScroll(true);
    }
  }, [wasScroll, messages, isLoading]);

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

  const scrollToEnd = () => {
    setTimeout(() => {
      listRef.current?.scrollToEnd();
    }, 0);
  };

  const handleScroll = async (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY <= 0) {
      await loadMessages(chatId);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.messagesContainer}>
        <VirtualizedList
          ref={listRef}
          data={reversedMessages}
          initialNumToRender={20}
          renderItem={renderMessage}
          keyExtractor={item => item.id.toString()}
          getItemCount={data => data.length}
          getItem={(data, index) => data[index]}
          contentContainerStyle={styles.contentContainer}
          onScroll={handleScroll}
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
