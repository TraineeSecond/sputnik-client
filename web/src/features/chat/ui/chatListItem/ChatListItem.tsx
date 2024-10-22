import { MouseEvent, memo } from 'react';

import { DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import {
  StyledAvatar,
  StyledContentWrapper,
  StyledDeleteButton,
  StyledListItem,
  StyledMessage,
  StyledSubtitle,
  StyledTextContainer,
  StyledTitle,
} from './ChatListItem.styles';

import { IChat } from 'features/chat/model/types';

const DEFAULT_AVATAR_TEXT = 'GOZON';

interface ChatListItemProps {
  chat: IChat;
  isSelected: boolean;
  handleChatSelect: (chatId: number) => void;
  handleChatDelete: (chatId: number) => Promise<void>;
}

const ChatListItem = ({
  chat,
  isSelected,
  handleChatSelect,
  handleChatDelete,
}: ChatListItemProps) => {
  const { t } = useTranslation();

  const handleSelect = () => {
    handleChatSelect(chat.id);
  };

  const handleDeleteClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      await handleChatDelete(chat.id);
      StyledMessage.success(t('Чат успешно удален'));
    } catch {
      StyledMessage.error(t('Ошибка при удалении чата'));
    }
  };

  const renderAvatar = () => {
    if (chat.product?.images?.length > 0) {
      return (
        <StyledAvatar
          src={chat.product.images[0].image}
          alt={chat.product.name}
        />
      );
    } else {
      return <StyledAvatar>{DEFAULT_AVATAR_TEXT}</StyledAvatar>;
    }
  };

  return (
    <StyledListItem selected={isSelected} onClick={handleSelect}>
      <StyledContentWrapper>
        {renderAvatar()}
        <StyledTextContainer>
          <StyledTitle>{chat.product?.name}</StyledTitle>
          <StyledSubtitle>{chat.product?.description}</StyledSubtitle>
        </StyledTextContainer>
        <StyledDeleteButton
          type='link'
          size='large'
          onClick={handleDeleteClick}
        >
          <DeleteOutlined />
        </StyledDeleteButton>
      </StyledContentWrapper>
    </StyledListItem>
  );
};

export default memo(ChatListItem);
