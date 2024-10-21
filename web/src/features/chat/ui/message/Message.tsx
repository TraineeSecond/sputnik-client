import { memo } from 'react';

import { formatTime } from 'shared';

import {
  StyledMessage,
  StyledMessageBubble,
  StyledTimestamp,
} from './Message.styles';

interface MessageProps {
  message: string;
  isOwnMessage: boolean;
  createdAt: string;
}

const Message = ({ message, isOwnMessage, createdAt }: MessageProps) => {
  const formattedTime = formatTime(createdAt);

  return (
    <StyledMessageBubble $isOwn={isOwnMessage}>
      <StyledMessage>{message}</StyledMessage>
      <StyledTimestamp>{formattedTime}</StyledTimestamp>
    </StyledMessageBubble>
  );
};

export default memo(Message);
