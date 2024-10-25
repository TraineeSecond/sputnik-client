import styled from 'styled-components';

export const StyledMessageContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export const StyledMessagesWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
  width: 100%;

  overflow-x: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  border-bottom: 1px solid #e1e4e8;
`;

export const StyledNoMessages = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  color: #999;
  user-select: none;
`;

export const StyledContentWrapper = styled.div`
  width: 100%;
`;
