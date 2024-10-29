import { Suspense, lazy, useCallback, useEffect } from 'react';

import { useChatStore } from 'features/chat/model/chatStore';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'shared/auth/model/authStore';
import { MainLayout } from 'widgets';

const ChatList = lazy(() =>
  import('features').then((module) => ({ default: module.ChatList })),
);

const ChatListPage = () => {
  const { user } = useAuthStore();
  const { loadChats, deleteChat } = useChatStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      void loadChats(user.id);
    }
  }, [user, loadChats]);

  const handleChatSelect = useCallback(
    (chatId: number) => {
      navigate(`/chat/${chatId}`);
    },
    [navigate],
  );

  const handleChatDelete = useCallback(
    (chatId: number) => deleteChat(chatId),
    [deleteChat],
  );

  return (
    <MainLayout>
      <Suspense fallback={<></>}>
        <ChatList
          handleChatSelect={handleChatSelect}
          handleChatDelete={handleChatDelete}
        />
      </Suspense>
    </MainLayout>
  );
};

export default ChatListPage;
