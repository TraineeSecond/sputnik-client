import {RouteProp, useRoute} from '@react-navigation/native';
import {Button, Card, Modal} from '@ui-kitten/components';
import React, {useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
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
import {Colors, TextStyles, emoji} from 'shared/libs/helpers';
import {ChatTextarea, Message} from 'shared/ui';
import {io} from 'socket.io-client';

import {ChatStyles as styles} from './styles';

type ProductRouteProp = RouteProp<RootStackParamsList, Screens.MESSENGER>;

const socket = io('http://domennameabcdef.ru:5555');

export const Chat = () => {
  const {t} = useTranslation();

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
        style={styles.modalContainer}
        onBackdropPress={onBackdropPress}>
        <Text
          style={[
            styles.centerText,
            TextStyles.h2.changeColor(Colors.Black100),
          ]}>
          {t('Выберите реакцию')}
        </Text>

        <ScrollView contentContainerStyle={styles.emojiListContainer}>
          {emojiKeys.map((reaction, ix) => {
            const handleSendReaction = () => {
              sendReaction(chatId, user.id, selectedMessageId, reaction);
              setModalVisible(false);
            };

            return (
              <TouchableOpacity
                style={styles.reactionItem}
                key={ix}
                onPress={handleSendReaction}>
                <Text style={TextStyles.reaction.changeColor(Colors.White100)}>
                  {emoji[reaction]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.buttonsGroup}>
          <Button style={styles.margin} onPress={handleUpdate}>
            {t('Изменить')}
          </Button>
          <Button style={styles.margin} onPress={handleDelete}>
            {t('Удалить')}
          </Button>
          <Button style={styles.margin} onPress={onBackdropPress}>
            {t('Отмена')}
          </Button>
        </View>
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
    const onSendReaction = (reaction: string) => {
      sendReaction(chatId, user.id, item.id, reaction);
    };
    return (
      <>
        <Message
          message={item.message}
          isCurrentUser={isCurrentUser}
          onLongPress={handleLongPress}
          reactions={item.reactions}
          onSendReaction={onSendReaction}
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
