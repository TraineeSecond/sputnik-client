import { Button, Card, Typography } from 'antd';
import styled from 'styled-components';

const { Title, Text } = Typography;

export const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledCardWrapper = styled(Card)``;

export const StyledTotalContainer = styled.div`
  text-align: right;
  margin-top: 2rem;
`;

export const StyledTitle = styled(Title)`
  font-size: 1.5rem;
`;

export const StyledText = styled(Text)`
  font-size: 1.5rem;
`;

export const StyledButton = styled(Button)`
  font-size: 1rem;
  padding: 0.5rem 1rem;
`;

export const StyledWrapper = styled.div`
  margin-bottom: 1rem;
`;
