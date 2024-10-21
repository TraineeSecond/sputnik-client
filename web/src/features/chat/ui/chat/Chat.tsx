import { useCallback, useEffect, useRef } from 'react';

import { MessageInput, MessageList } from 'features';
import { useChatStore } from 'features/chat/model/chatStore';
import { MessageListRef } from 'features/chat/ui/messageList/MessageList';
import { useAuthStore } from 'shared/auth/model/authStore';

import { StyledChatContainer, StyledChatContent } from './Chat.styles';

const Chat = () => {
  const { user } = useAuthStore();
  const {
    messages,
    pagination,
    loadMessages,
    initSocket,
    sendMessage,
    socket,
  } = useChatStore();

  useEffect(() => {
    const socket = initSocket();
    return () => {
      socket();
    };
  }, [initSocket]);

  const fetchMoreMessages = useCallback(() => {
    void loadMessages();
  }, [loadMessages]);

  const messageListRef = useRef<MessageListRef>(null);

  const handleSendMessage = (messageText: string) => {
    if (user) {
      sendMessage(messageText, user.id);
      messageListRef.current?.scrollToBottom();
    }
  };
  const { hasMoreMessages, isLoadingMessages } = pagination;

  if ((messages.length === 0 && isLoadingMessages) || !user || socket === null)
    return null;

  return (
    <StyledChatContainer>
      <StyledChatContent>
        <MessageList
          ref={messageListRef}
          userId={user.id}
          messages={messages}
          hasMoreMessages={hasMoreMessages}
          fetchMoreMessages={fetchMoreMessages}
        />
        <MessageInput handleSendMessage={handleSendMessage} />
      </StyledChatContent>
    </StyledChatContainer>
  );
};

export default Chat;
