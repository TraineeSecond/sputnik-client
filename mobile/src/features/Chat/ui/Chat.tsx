import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo} from 'react';
import {KeyboardAvoidingView, View, VirtualizedList} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {RootStackParamsList} from 'app/navigation/navigationTypes';
import {IMessage, useChatStore} from 'entities/chat';
import {useUserStore} from 'entities/user';
import {ChatTextarea, Message, MessageActionsModal} from 'shared/ui';
import {io} from 'socket.io-client';

import {ChatStyles as styles} from './styles';

type ProductRouteProp = RouteProp<RootStackParamsList, Screens.MESSENGER>;

const socket = io('http://domennameabcdef.ru:5555');

export const Chat = () => {
  const route = useRoute<ProductRouteProp>();
  const {chatId} = route.params;
  const {
    messages,
    sendingMessages,
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
    sendReaction,
    modalVisible,
    setModalVisible,
    selectedMessageId,
    setSelectedMessageId,
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
  console.log(chatId);
  useEffect(() => {
    socket.emit('joinChat', chatId);

    socket.on('newMessage', newMessage => {
      if (newMessage.authorId === user.id) {
        const messagesWithoutLast = messages.slice(1);
        setMessages([newMessage, ...messagesWithoutLast]);
      } else {
        setMessages([newMessage, ...messages]);
      }
    });

    socket.on('updatedMessage', messageData => {
      setMessages(
        messages.map(msg => (msg.id === messageData.id ? messageData : msg)),
      );
    });

    socket.on('reactionUpdated', updatedMessage => {
      setMessages(
        messages.map(msg =>
          msg.id === updatedMessage.id ? updatedMessage : msg,
        ),
      );
    });

    socket.on('deletedMessage', ({messageId}) => {
      setMessages(messages.filter(msg => msg.id !== messageId));
    });

    return () => {
      socket.emit('leaveChat', chatId);
      socket.off('newMessage');
      socket.off('updatedMessage');
      socket.off('reactionUpdated');
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

  const closeloseModal = () => {
    setModalVisible(false);
  };

  const handleDeleteMessage = () => {
    deleteMessage(chatId, selectedMessageId);
    closeloseModal();
  };

  const handleUpdate = () => {
    const messageToEdit = messages.find(msg => msg.id === selectedMessageId);
    if (messageToEdit) {
      setCurrentMessage(messageToEdit.message);
      setUpdatingMessageId(messageToEdit.id);
    }
    closeloseModal();
  };

  const onBackdropPress = () => closeloseModal();

  const handleSendReaction = (reaction: string) => {
    sendReaction(chatId, user.id, selectedMessageId, reaction);
    closeloseModal();
  };

  const handleAttachFile = () => {};

  const longPress = (messageId: number) => {
    setModalVisible(true);
    setSelectedMessageId(messageId);
  };

  const renderMessage = ({item}: {item: IMessage}) => {
    const isCurrentUser = item.authorId === user.id;
    const handleLongPress = () => longPress(item.id);
    const onSendReaction = (reaction: string) => {
      sendReaction(chatId, user.id, item.id, reaction);
    };

    const isSending = !!sendingMessages[item.id];

    return (
      <>
        <Message
          message={item.message}
          isCurrentUser={isCurrentUser}
          onLongPress={handleLongPress}
          reactions={item.reactions}
          onSendReaction={onSendReaction}
          isSending={isSending}
        />
      </>
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
        <MessageActionsModal
          modalVisible={modalVisible}
          onBackdropPress={onBackdropPress}
          handleDelete={handleDeleteMessage}
          handleUpdate={handleUpdate}
          sendReaction={handleSendReaction}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
