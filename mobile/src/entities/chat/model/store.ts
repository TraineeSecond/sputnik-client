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
  updatingMessageId: number | null;
  error: boolean;
  setUpdatingMessageId: (value: number | null) => void;
  loadMessages: (chatId: number) => Promise<void>;
  sendMessage: (chatId: number, authorId: number) => void;
  deleteMessage: (chatId: number, messageId: number) => void;
  editMessage: (chatId: number, messageId: number, newMessage: string) => void;
  setCurrentMessage: (message: string) => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  currentMessage: '',
  isLoading: false,
  error: false,

  updatingMessageId: null,

  setUpdatingMessageId: updatingMessageId => set({updatingMessageId}),

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

  sendMessage: (chatId: number, authorId: number) => {
    const message = get().currentMessage;
    if (!message) return;

    socket.emit('sendMessage', {chatId, message, authorId});
  },

  deleteMessage: (chatId: number, messageId: number) => {
    socket.emit('deleteMessage', {chatId, messageId});
  },

  editMessage: (chatId: number, messageId: number, message: string) => {
    socket.emit('updateMessage', {chatId, messageId, message});
  },
}));
