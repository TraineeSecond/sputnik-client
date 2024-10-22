import api from 'shared/api/api';
import { Socket, io } from 'socket.io-client';
import { create } from 'zustand';

import { IChat, IMessage, IPagination } from './types';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
const TAKE = 20;

interface ChatState {
  chats: IChat[];
  socket: Socket | null;
  selectedChatId: number | null;
  messages: IMessage[];
  pagination: IPagination;
  isChatsLoading: boolean;
  loadChats: (userId: number) => Promise<void>;
  setSelectedChatId: (chatId: number | null) => void;
  initSocket: () => () => void;
  sendMessage: (messageText: string, authorId: number) => void;
  addMessage: (message: IMessage) => void;
  loadMessages: () => Promise<void>;
  deleteChat: (chatId: number) => Promise<void>;
  startChatWithSeller: (
    userId: number,
    sellerId: number,
    token: string,
    productId: number,
  ) => Promise<number | null>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  socket: null,
  selectedChatId: null,
  messages: [],
  pagination: { skip: 0, hasMoreMessages: true, isLoadingMessages: false },
  isChatsLoading: false,

  loadChats: async (userId) => {
    set({ isChatsLoading: true });
    try {
      const response = await api.get<IChat[]>(`${userId}/chats`);
      set({ chats: response.data, isChatsLoading: false });
    } catch (error) {
      set({ isChatsLoading: false });
      console.error('Ошибка загрузки чатов:', error);
    }
  },

  setSelectedChatId: (chatId) => {
    set({
      selectedChatId: chatId,
      messages: [],
      pagination: { skip: 0, hasMoreMessages: true, isLoadingMessages: false },
    });
    if (chatId) {
      void get().loadMessages();
    }
  },

  initSocket: () => {
    const newSocket = io(SOCKET_URL, {
      autoConnect: true,
    });

    newSocket.on('connect', () => {
      const { selectedChatId } = get();
      if (selectedChatId) {
        newSocket.emit('joinChat', selectedChatId);
      }
    });

    newSocket.on('newMessage', (message: IMessage) => {
      if (message.chatId === get().selectedChatId) {
        get().addMessage(message);
      }
    });

    set({ socket: newSocket });
    return () => {
      newSocket.disconnect();
      set({ socket: null });
    };
  },

  sendMessage: (messageText, authorId) => {
    const { selectedChatId, socket } = get();
    if (!selectedChatId) {
      console.warn('Чат не выбран');
      return;
    }
    if (!socket) {
      console.warn('Socket не инициализирован');
      return;
    }
    const messageData = {
      chatId: selectedChatId,
      authorId,
      message: messageText,
    };
    socket.emit(
      'sendMessage',
      messageData,
      (response: { status: string; error?: string }) => {
        if (response.status !== 'ok') {
          console.error('Не удалось отправить сообщение:', response.error);
        }
      },
    );
  },

  addMessage: (message) => {
    set((state) => ({
      messages: [message, ...state.messages],
    }));
  },

  loadMessages: async () => {
    const { selectedChatId, pagination, messages } = get();
    if (!selectedChatId) return;
    if (!pagination.hasMoreMessages || pagination.isLoadingMessages) return;

    set((state) => ({
      pagination: { ...state.pagination, isLoadingMessages: true },
    }));

    try {
      const response = await api.get<IMessage[]>(
        `/chats/${selectedChatId}/messages`,
        {
          params: { skip: pagination.skip, take: TAKE },
        },
      );

      const existingMessageIds = new Set(messages.map((msg) => msg.id));
      const newMessages = response.data.filter(
        (msg) => !existingMessageIds.has(msg.id),
      );

      set((state) => ({
        messages: [...state.messages, ...newMessages],
        pagination: {
          skip: state.pagination.skip + newMessages.length,
          hasMoreMessages: newMessages.length === TAKE,
          isLoadingMessages: false,
        },
      }));
    } catch (error) {
      console.error('Ошибка загрузки сообщений:', error);
      set((state) => ({
        pagination: { ...state.pagination, isLoadingMessages: false },
      }));
    }
  },

  deleteChat: async (chatId) => {
    try {
      await api.delete(`/chats/${chatId}`);
      set((state) => {
        const isSelected = state.selectedChatId === chatId;
        return {
          chats: state.chats.filter((chat) => chat.id !== chatId),
          selectedChatId: isSelected ? null : state.selectedChatId,
        };
      });
    } catch (error) {
      console.error('Ошибка удаления чата:', error);
      throw error;
    }
  },

  startChatWithSeller: async (
    userId: number,
    sellerId: number,
    token: string,
    productId: number,
  ): Promise<number | null> => {
    const { setSelectedChatId } = get();

    try {
      const response = await api.post<IChat>(
        '/chats',
        {
          productId,
          userIds: [userId, sellerId],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const newChat: IChat = response.data;
      setSelectedChatId(newChat.id);
      return newChat.id;
    } catch (error) {
      console.error('Ошибка при создании чата с продавцом:', error);
      return null;
    }
  },
}));
