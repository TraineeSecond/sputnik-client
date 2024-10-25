import { useEffect } from 'react';

import { Chat } from 'features';
import { useChatStore } from 'features/chat/model/chatStore';
import { useParams } from 'react-router-dom';
import { MainLayout } from 'widgets';

//TODO:убрать возможность перехода на несуществующий чат

const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const chatIdNumber = chatId ? +chatId : null;

  const { selectedChatId, setSelectedChatId } = useChatStore();

  useEffect(() => {
    if (chatIdNumber !== selectedChatId) {
      setSelectedChatId(chatIdNumber);
    }
  }, [chatIdNumber, selectedChatId, setSelectedChatId]);

  return (
    <MainLayout>
      <Chat />
    </MainLayout>
  );
};

export default ChatPage;
