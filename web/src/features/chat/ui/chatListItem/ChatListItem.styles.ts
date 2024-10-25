import { Avatar, Button, message } from 'antd';
import styled from 'styled-components';

export { message as StyledMessage };

export const StyledAvatar = styled(Avatar)`
  flex-shrink: 0;
  width: 3.5rem;
  height: 3.5rem;
  background-color: #87d068;
`;

export const StyledListItem = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;
  background-color: ${({ selected }) => (selected ? '#e6f7ff' : 'transparent')};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const StyledContentWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex: 1;
  overflow: hidden;
  user-select: none;
`;

export const StyledTextContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StyledTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledSubtitle = styled.div`
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledDeleteButton = styled(Button)`
  flex-shrink: 0;
  padding: 0;
`;
