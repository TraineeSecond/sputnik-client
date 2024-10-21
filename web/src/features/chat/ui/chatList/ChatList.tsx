import { memo } from 'react';

import { ChatListItem } from 'features';
import { useChatStore } from 'features/chat/model/chatStore';

import { StyledList } from './ChatList.styles';

interface ChatListProps {
  handleChatSelect: (chatId: number) => void;
  handleChatDelete: (chatId: number) => Promise<void>;
}

const ChatList = ({ handleChatSelect, handleChatDelete }: ChatListProps) => {
  const { chats, selectedChatId, isChatsLoading, socket } = useChatStore();
  if (isChatsLoading || socket !== null) return null;

  return (
    <StyledList>
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          isSelected={chat.id === selectedChatId}
          handleChatSelect={handleChatSelect}
          handleChatDelete={handleChatDelete}
        />
      ))}
    </StyledList>
  );
};

export default memo(ChatList);
