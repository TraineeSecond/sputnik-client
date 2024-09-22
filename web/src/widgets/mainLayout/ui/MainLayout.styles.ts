import styled from 'styled-components';

export const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 85rem;
  min-height: 100vh;
`;

export const StyledLayoutHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 80rem;
  height: 5rem;
`;

export const StyledLayoutContent = styled.main`
  display: flex;
  width: 100%;
  max-width: 80rem;
`;
