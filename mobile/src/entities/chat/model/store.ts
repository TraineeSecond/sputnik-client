import axios from 'axios';
import {io} from 'socket.io-client';
import {create} from 'zustand';

import {IMessage} from './types';

const socket = io('http://domennameabcdef.ru:5555');

type ChatStore = {
  messages: IMessage[];
  sendingMessages: {[key: string]: boolean};
  setSendingMessage: (messageId: string, status: boolean) => void;
  setMessages: (messages: IMessage[]) => void;
  currentMessage: string;
  isLoading: boolean;
  updatingMessageId: number | null;
  error: boolean;
  skip: number;
  wasScroll: boolean;
  modalVisible: boolean;
  selectedMessageId: number;
  setSelectedMessageId: (value: number) => void;
  setModalVisible: (value: boolean) => void;
  setWasScroll: (value: boolean) => void;
  setSkip: (value: number) => void;
  setUpdatingMessageId: (value: number | null) => void;
  loadMessages: (chatId: number) => Promise<void>;
  sendMessage: (chatId: number, authorId: number) => void;
  sendReaction: (
    chatId: number,
    userId: number,
    messageId: number,
    reaction: string,
  ) => void;
  deleteMessage: (chatId: number, messageId: number) => void;
  editMessage: (chatId: number, messageId: number, newMessage: string) => void;
  setCurrentMessage: (message: string) => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  sendingMessages: {},
  setSendingMessage: (messageId, status) => {
    set(state => ({
      sendingMessages: {...state.sendingMessages, [messageId]: status},
    }));
  },
  currentMessage: '',
  isLoading: false,
  error: false,
  skip: 0,
  wasScroll: false,
  updatingMessageId: null,

  modalVisible: false,

  selectedMessageId: 0,
  setSelectedMessageId: value => set({selectedMessageId: value}),
  setModalVisible: value => set({modalVisible: value}),

  setWasScroll: wasScroll => set({wasScroll}),

  setSkip: skip => set({skip}),

  setUpdatingMessageId: updatingMessageId => set({updatingMessageId}),

  setMessages: (messages: IMessage[]) => set({messages}),

  setCurrentMessage: (message: string) => {
    set({currentMessage: message});
  },

  loadMessages: async (chatId: number) => {
    set({isLoading: true, error: false});
    try {
      const response = await axios.get<IMessage[]>(
        `https://domennameabcdef.ru/api/chats/${chatId}/messages?take=20&skip=${
          get().skip
        }`,
      );
      const newMessages = response.data.filter(
        newMsg => !get().messages.some(msg => msg.id === newMsg.id),
      );
      set({
        messages: [...get().messages, ...newMessages],
        isLoading: false,
        skip: get().skip + 20,
      });
    } catch (error) {
      set({error: true, isLoading: false});
    }
  },

  sendMessage: (chatId: number, authorId: number) => {
    const message = get().currentMessage;
    if (!message) return;

    // Генерируем временный отрицательный ID на основе текущего времени
    const tempMessageId = -Date.now();

    // Получаем текущее состояние
    const currentMessages = get().messages;
    const currentSendingMessages = get().sendingMessages || {};

    set({
      messages: [
        {
          id: tempMessageId,
          chatId,
          message,
          authorId,
          reactions: [],
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
          author: {
            id: 0,
            email: '',
            role: '',
            name: '',
            surname: '',
          },
          isSending: true, // Устанавливаем флаг отправки
        },
        ...currentMessages,
      ],
      sendingMessages: {...currentSendingMessages, [tempMessageId]: true},
    });

    socket.emit('sendMessage', {chatId, message, authorId});
  },

  sendReaction: (
    chatId: number,
    userId: number,
    messageId: number,
    reaction: string,
  ) => {
    socket.emit('sendReaction', {chatId, userId, messageId, reaction});
  },

  deleteMessage: (chatId: number, messageId: number) => {
    socket.emit('deleteMessage', {chatId, messageId});
  },

  editMessage: (chatId: number, messageId: number, message: string) => {
    socket.emit('updateMessage', {chatId, messageId, message});
  },
}));
