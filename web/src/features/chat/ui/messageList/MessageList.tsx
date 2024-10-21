import {
  CSSProperties,
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
} from 'react';

import { Message } from 'features';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  StyledContentWrapper,
  StyledMessageContainer,
  StyledMessagesWrapper,
  StyledNoMessages,
} from './MessageList.styles';

import { IMessage } from 'features/chat/model/types';

const SCROLL_THRESHOLD = 1;

const INFINITE_SCROLL_STYLES: CSSProperties = {
  display: 'flex',
  flexDirection: 'column-reverse',
  gap: '1rem',
  padding: '1rem',
  width: '100%',
};

interface MessageListProps {
  userId: number;
  fetchMoreMessages: () => void;
  messages: IMessage[];
  hasMoreMessages: boolean;
}

export interface MessageListRef {
  scrollToBottom: () => void;
}

const MessageList = forwardRef<MessageListRef, MessageListProps>(
  ({ userId, fetchMoreMessages, messages, hasMoreMessages }, ref) => {
    const { t } = useTranslation();
    const scrollableDivRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      scrollToBottom: () => {
        if (scrollableDivRef.current) {
          scrollableDivRef.current.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
      },
    }));

    if (messages.length === 0) {
      return (
        <StyledMessageContainer>
          <StyledNoMessages>{t('Нет сообщений в этом чате')}</StyledNoMessages>
        </StyledMessageContainer>
      );
    }

    return (
      <StyledMessagesWrapper id='scrollableDiv' ref={scrollableDivRef}>
        <StyledContentWrapper>
          <InfiniteScroll
            dataLength={messages.length}
            next={fetchMoreMessages}
            hasMore={hasMoreMessages}
            scrollThreshold={SCROLL_THRESHOLD}
            inverse={true}
            loader={null}
            style={INFINITE_SCROLL_STYLES}
            scrollableTarget='scrollableDiv'
          >
            {messages.map((message: IMessage) => {
              const isOwnMessage = message.authorId === userId;
              return (
                <Message
                  key={message.id}
                  message={message.message}
                  isOwnMessage={isOwnMessage}
                  createdAt={message.createdAt}
                />
              );
            })}
          </InfiniteScroll>
        </StyledContentWrapper>
      </StyledMessagesWrapper>
    );
  },
);

export default memo(MessageList);
