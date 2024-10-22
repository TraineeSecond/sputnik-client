import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const StyledMessageBubble = styled.div<{ $isOwn: boolean }>`
  max-width: 64%;
  padding: 0.5rem;
  align-self: ${({ $isOwn }) => ($isOwn ? 'flex-end' : 'flex-start')};

  border-radius: ${({ $isOwn }) =>
    $isOwn ? '15px 15px 5px 15px' : '15px 15px 15px 5px'};
  background-color: ${({ $isOwn }) => ($isOwn ? '#B3D4E8' : '#EBF5FB')};
  box-shadow: 0 0.25rem 0.5rem 0.125rem rgba(0, 0, 0, 0.1);
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;

  animation: ${fadeIn} 0.3s ease-out;
`;

export const StyledTimestamp = styled.div`
  margin-top: 5px;

  text-align: right;
  font-size: 0.7em;
  color: #999;
  user-select: none;
`;

export const StyledMessage = styled.div``;
