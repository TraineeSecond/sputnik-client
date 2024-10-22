import { message } from 'antd';
import styled from 'styled-components';

export const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 6rem);
  overflow-y: auto;
  border: 1px solid #e1e4e8;
`;

export const StyledMessage = message;
