import axios from 'axios';
import {Chat} from 'entities';
import {create} from 'zustand';

type ChatListStore = {
  chatList: Chat[];
  isLoading: boolean;
  error: boolean;
  skip: number;
  setSkip: (skip: number) => void;
  setChatList: (chatList: Chat[]) => void;
  addChat: (productId: number) => Promise<void>;
  deleteChat: (chatId: number) => void;
  loadChats: (userId: number) => Promise<void>;
};

export const useChatListStore = create<ChatListStore>((set, get) => ({
  chatList: [],
  isLoading: false,
  error: false,
  skip: 0,

  setSkip: (skip: number) => set({skip}),

  setChatList: (chatList: Chat[]) => set({chatList}),

  loadChats: async (userId: number) => {
    set({isLoading: true, error: false});
    console.log('123123', get().skip);
    try {
      const response = await axios.get<Chat[]>(
        `https://domennameabcdef.ru/api/${userId}/chats?take=20&skip=${
          get().skip
        }`,
      );
      const newChats = response.data.filter(
        newChat => !get().chatList.some(chat => chat.id === newChat.id),
      );
      set({
        chatList: [...get().chatList, ...newChats],
        isLoading: false,
        skip: get().skip + newChats.length,
      });
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
