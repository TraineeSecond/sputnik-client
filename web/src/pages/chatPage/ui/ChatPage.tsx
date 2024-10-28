import { Suspense, lazy, useEffect } from 'react';

import { useChatStore } from 'features/chat/model/chatStore';
import { useParams } from 'react-router-dom';
import { MainLayout } from 'widgets';

const Chat = lazy(() =>
  import('features').then((module) => ({ default: module.Chat })),
);

//TODO: убрать возможность перехода на несуществующий чат

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
      <Suspense fallback={<></>}>
        <Chat />
      </Suspense>
    </MainLayout>
  );
};

export default ChatPage;
