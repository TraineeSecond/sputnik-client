import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  Dimensions,
  FlatList,
  GestureResponderEvent,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';
import {Screens} from 'app/navigation/navigationEnums';
import {RootStackParamsList} from 'app/navigation/navigationTypes';
import {IMessage, TImages, useChatStore} from 'entities/chat';
import {useUserStore} from 'entities/user';
import {launchImageLibrary} from 'react-native-image-picker';
import {CloseCircleIcon} from 'shared/icons';
import {Colors, IconStyles} from 'shared/libs/helpers';
import {useMessageStore} from 'shared/stores/MessageStore';
import {ChatTextarea, Message, MessageActionsModal} from 'shared/ui';
import {io} from 'socket.io-client';

import {ChatStyles as styles} from './styles';

type ProductRouteProp = RouteProp<RootStackParamsList, Screens.MESSENGER>;

const socket = io('http://domennameabcdef.ru:5555');

const MODAL_HEIGHT = 200;
const MODAL_WIDTH = 330;

export const Chat = () => {
  const {t} = useTranslation();
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
    attachedImages,
    setAttachedImages,
  } = useChatStore();

  const {user} = useUserStore();

  const listRef = React.useRef<FlatList<IMessage>>(null);
  const reversedMessages = useMemo(() => [...messages].reverse(), [messages]);
  const [modalPosition, setModalPosition] = useState({x: 0, y: 0});
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

  useEffect(() => {
    loadMessages(chatId);
    socket.emit('readMessages', {chatId, userId: user.id});

    return () => {
      setMessages([]);
      setSkip(0);
      setAttachedImages([]);
      setWasScroll(false);
    };
  }, [chatId]);

  useEffect(() => {
    socket.emit('joinChat', chatId);

    socket.on('readedMessages', ({chatId, userId}) => {
      setMessages(
        messages.map((msg: IMessage) =>
          msg.authorId === user.id ? {...msg, isRead: true} : msg,
        ),
      );
    });

    socket.on('newMessage', newMessage => {
      if (newMessage.authorId === user.id) {
        const messagesWithoutLast = messages.slice(1);
        setMessages([newMessage, ...messagesWithoutLast]);
      } else {
        setMessages([newMessage, ...messages]);
        socket.emit('readMessages', {chatId, userId: user.id});
      }
    });

    socket.on('messageError', ({messageId}) => {
      Alert.alert(t('Ошибка отправки сообщения'));
      setMessages(
        messages.map(msg =>
          msg.id === messageId ? {...msg, hasError: true} : msg,
        ),
      );
    });

    socket.on('updatedMessage', messageData => {
      setMessages(
        messages.map(msg =>
          msg.id === messageData.id
            ? {...msg, message: messageData.message}
            : msg,
        ),
      );
    });

    socket.on('reactionUpdated', updatedMessage => {
      setMessages(
        messages.map(msg =>
          msg.id === updatedMessage.id
            ? {...msg, reactions: updatedMessage.reactions}
            : msg,
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
      socket.off('readedMessages');
      socket.off('messageError');
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
      sendMessage(chatId, user.id, attachedImages);
    }
    setCurrentMessage('');
    setAttachedImages([]);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDeleteMessage = () => {
    deleteMessage(chatId, selectedMessageId);
    closeModal();
  };

  const handleUpdate = () => {
    const messageToEdit = messages.find(msg => msg.id === selectedMessageId);
    if (messageToEdit) {
      setCurrentMessage(messageToEdit.message);
      setUpdatingMessageId(messageToEdit.id);
    }
    closeModal();
  };

  const handleCopy = () => {
    const messageToCopy = messages.find(msg => msg.id === selectedMessageId);
    if (messageToCopy) Clipboard.setString(messageToCopy.message);
    closeModal();
  };

  const onBackdropPress = () => closeModal();

  const handleSendReaction = (reaction: string) => {
    sendReaction(chatId, user.id, selectedMessageId, reaction);
    closeModal();
  };

  const handleAttachFile = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 0,
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          const newImages: TImages[] = response.assets.map((asset, index) => ({
            id: index,
            image: asset.uri || '',
            messageId: -Date.now(),
          }));

          setAttachedImages([...attachedImages, ...newImages]);
        }
      },
    );
  };

  const removeImage = (uri: string) => {
    setAttachedImages(
      attachedImages.filter(imageUri => imageUri.image !== uri),
    );
  };

  const longPress = (event: GestureResponderEvent, messageId: number) => {
    const {pageX, pageY} = event.nativeEvent;

    const modalX = Math.min(pageX, screenWidth - MODAL_WIDTH);
    const modalY = Math.min(pageY, screenHeight - MODAL_HEIGHT);

    setModalPosition({x: modalX, y: modalY});
    setModalVisible(true);
    setSelectedMessageId(messageId);
  };

  const renderAttachedImages = () => {
    if (attachedImages.length === 0) return null;

    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.imageContainer}>
        {attachedImages.map((image, ix) => {
          const handleRemoveImage = () => removeImage(image.image);
          return (
            <View key={ix} style={styles.previewImageWrapper}>
              <Image source={{uri: image.image}} style={styles.previewImage} />
              <TouchableOpacity
                onPress={handleRemoveImage}
                style={styles.closeButton}>
                <CloseCircleIcon
                  fill={Colors.White100}
                  width={IconStyles.medium.width}
                  height={IconStyles.medium.height}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  const renderMessage = ({item}: {item: IMessage}) => {
    const isCurrentUser = item.authorId === user.id;
    const handleLongPress = (event: GestureResponderEvent) =>
      longPress(event, item.id);

    const onSendReaction = (reaction: string) => {
      sendReaction(chatId, user.id, item.id, reaction);
    };

    const isSending = !!sendingMessages[item.id];

    const hasError = item?.hasError;
    return (
      <>
        <Message
          message={item.message}
          isCurrentUser={isCurrentUser}
          onLongPress={handleLongPress}
          reactions={item.reactions}
          onSendReaction={onSendReaction}
          isSending={isSending}
          isRead={item.isRead}
          hasError={hasError}
          images={item.images}
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
        <FlatList
          ref={listRef}
          data={reversedMessages}
          initialNumToRender={20}
          renderItem={renderMessage}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.contentContainer}
          onScroll={handleScroll}
        />
        {renderAttachedImages()}
        <ChatTextarea
          message={currentMessage}
          setMessage={setCurrentMessage}
          onSendMessage={handleSendOrUpdate}
          onAttachFile={handleAttachFile}
        />
        <MessageActionsModal
          modalVisible={modalVisible}
          modalPosition={modalPosition}
          handleCopy={handleCopy}
          handleUpdate={handleUpdate}
          onBackdropPress={onBackdropPress}
          sendReaction={handleSendReaction}
          handleDelete={handleDeleteMessage}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
