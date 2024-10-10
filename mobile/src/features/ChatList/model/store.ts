import axios from 'axios';
import {Chat} from 'entities';
import {create} from 'zustand';

type ChatListStore = {
  chatList: Chat[];
  isLoading: boolean;
  error: boolean;
  addChat: (productId: number) => Promise<void>;
  deleteChat: (chatId: number) => void;
  loadChats: (userId: number) => Promise<void>;
};

// TODO: Поменять на нормальные запросы

export const useChatListStore = create<ChatListStore>(set => ({
  chatList: [],
  isLoading: false,
  error: false,

  loadChats: async (userId: number) => {
    set({isLoading: true, error: false});
    try {
      const response = await axios.get<Chat[]>(
        `https://domennameabcdef.ru/api/${userId}/chats`,
      );
      set({chatList: response.data, isLoading: false});
    } catch (error) {
      set({error: true, isLoading: false});
    }
  },

  addChat: async (productId: number) => {
    set({isLoading: true, error: false});
    try {
      const response = await axios.post<Chat>(
        'https://domennameabcdef.ru/api/chats',
        {productId},
      );
      set(state => ({
        chatList: [...state.chatList, response.data],
        isLoading: false,
      }));
    } catch (error) {
      set({error: true, isLoading: false});
    }
  },

  deleteChat: async (chatId: number) => {
    set({isLoading: true, error: false});
    try {
      await axios.delete(`https://domennameabcdef.ru/api/chats/${chatId}`);
      set(state => ({
        chatList: state.chatList.filter(chat => chat.id !== chatId),
        isLoading: false,
      }));
    } catch (error) {
      set({error: true, isLoading: false});
    }
  },
}));
