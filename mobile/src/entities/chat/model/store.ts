import axios from 'axios';
import {io} from 'socket.io-client';
import {create} from 'zustand';

import {IMessage} from './types';

const socket = io('http://domennameabcdef.ru:5555');

type ChatStore = {
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
  currentMessage: string;
  isLoading: boolean;
  error: boolean;
  loadMessages: (chatId: number) => Promise<void>;
  sendMessage: (chatId: number, authorId: number) => void;
  deleteMessage: (messageId: number) => Promise<void>;
  editMessage: (messageId: number, newContent: string) => Promise<void>;
  setCurrentMessage: (message: string) => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  currentMessage: '',
  isLoading: false,
  error: false,

  setMessages: (messages: IMessage[]) => set({messages}),

  setCurrentMessage: (message: string) => {
    set({currentMessage: message});
  },

  loadMessages: async (chatId: number) => {
    set({isLoading: true, error: false});
    try {
      const response = await axios.get<IMessage[]>(
        `https://domennameabcdef.ru/api/chats/${chatId}/messages`,
      );
      set({messages: response.data, isLoading: false});
    } catch (error) {
      set({error: true, isLoading: false});
    }
  },

  // sendMessage: async (chatId: number) => {
  //   set({isLoading: true, error: false});
  //   try {
  //     const response = await axios.post<IMessage>(
  //       `https://domennameabcdef.ru/api/chats/${chatId}/messages`,
  //       {message: get().currentMessage},
  //     );
  //     set(state => ({
  //       messages: [...state.messages, response.data],
  //       currentMessage: '',
  //       isLoading: false,
  //     }));
  //   } catch (error) {
  //     set({error: true, isLoading: false});
  //   }
  // },

  sendMessage: (chatId: number, authorId: number) => {
    const message = get().currentMessage;
    if (!message) return;

    socket.emit('sendMessage', {chatId, message, authorId});

    // Слушаем событие нового сообщения от сервера
    socket.on('newMessage', (newMessage: IMessage) => {
      set(state => ({
        messages: [...state.messages, newMessage],
        currentMessage: '',
      }));
    });
  },

  deleteMessage: async (messageId: number) => {
    set({isLoading: true, error: false});
    try {
      await axios.delete(
        `https://domennameabcdef.ru/api/messages/${messageId}`,
      );
      set(state => ({
        messages: state.messages.filter(msg => msg.id !== messageId),
        isLoading: false,
      }));
    } catch (error) {
      set({error: true, isLoading: false});
    }
  },

  editMessage: async (messageId: number, newContent: string) => {
    set({isLoading: true, error: false});
    try {
      const response = await axios.put<IMessage>(
        `https://domennameabcdef.ru/api/messages/${messageId}`,
        {message: newContent},
      );
      set(state => ({
        messages: state.messages.map(msg =>
          msg.id === messageId ? response.data : msg,
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({error: true, isLoading: false});
    }
  },
}));
