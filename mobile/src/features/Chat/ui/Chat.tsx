import {RouteProp, useRoute} from '@react-navigation/native';
import {Button, Card, Modal} from '@ui-kitten/components';
import React, {useEffect, useMemo} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {RootStackParamsList} from 'app/navigation/navigationTypes';
import {IMessage, useChatStore} from 'entities/chat';
import {useUserStore} from 'entities/user';
import {emoji} from 'shared/libs/helpers';
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
    sendReaction,
    selectedReaction,
    setSelectedReaction,
    modalVisible,
    setModalVisible,
    selectedMessageId,
    setSelectedMessageId,
  } = useChatStore();

  const {user} = useUserStore();

  const listRef = React.useRef<VirtualizedList<IMessage>>(null);

  const reversedMessages = useMemo(() => [...messages].reverse(), [messages]);
  console.log(chatId);
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

  const handleDeleteMessage = (messageId: number) => {
    deleteMessage(chatId, messageId);
  };

  const handleAttachFile = () => {};

  const MessageActionsModal = () => {
    const onBackdropPress = () => setModalVisible(false);
    const handleDelete = () => {
      handleDeleteMessage(selectedMessageId);
      setModalVisible(false);
    };

    const handleUpdate = () => {
      const messageToEdit = messages.find(msg => msg.id === selectedMessageId);
      if (messageToEdit) {
        setCurrentMessage(messageToEdit.message);
        setUpdatingMessageId(messageToEdit.id);
      }
      setModalVisible(false);
    };
    const emojiKeys = Object.keys(emoji) as Array<keyof typeof emoji>;

    return (
      <Modal
        visible={modalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={onBackdropPress}>
        <Card disabled={true}>
          <ScrollView>
            <Text>Выберите действие</Text>
            <View>
              {emojiKeys.map(key => {
                const handleSendReaction = () => {
                  sendReaction(chatId, user.id, selectedMessageId, key);
                  setModalVisible(false);
                };

                return (
                  <TouchableOpacity onPress={handleSendReaction}>
                    <Text>{emoji[key]}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Button onPress={handleUpdate}>Изменить</Button>
            <Button onPress={handleDelete}>Удалить</Button>
            <Button onPress={onBackdropPress}>Отмена</Button>
          </ScrollView>
        </Card>
      </Modal>
    );
  };

  const longPress = (messageId: number) => {
    setModalVisible(true);
    setSelectedMessageId(messageId);
  };

  const renderMessage = ({item}: {item: IMessage}) => {
    const isCurrentUser = item.authorId === user.id;
    const handleLongPress = () => longPress(item.id);
    console.log(item.id, item.reactions);
    const onSendReaction = () =>
      sendReaction(chatId, user.id, item.id, selectedReaction);
    return (
      <>
        <Message
          message={item.message}
          isCurrentUser={isCurrentUser}
          onLongPress={handleLongPress}
          reactions={item.reactions}
          onSendReaction={onSendReaction}
          setSelectedReaction={setSelectedReaction}
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
        <MessageActionsModal />
      </KeyboardAvoidingView>
    </View>
  );
};
