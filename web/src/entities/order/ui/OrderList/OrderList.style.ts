import styled from 'styled-components';

export const StyledList = styled.div`
  max-height: 360px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;
