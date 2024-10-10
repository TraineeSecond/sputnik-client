import { Button, Card, Typography } from 'antd';
import styled from 'styled-components';

const { Text, Title } = Typography;

export const StyledCard = styled(Card)``;

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  flex-grow: 1;
  margin-left: 1rem;
`;

export const StyledImage = styled.img`
  width: 100px;
  height: 150px;
  border-radius: 8px;
  align-self: flex-start;
  object-fit: cover;
`;

export const StyledButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
`;

export const StyledButton = styled(Button)`
  margin: 0;
`;

export const StyledTotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  height: 100%;
`;

export const StyledQuantity = styled.span`
  margin: 0;
  font-size: 16px;
`;

export const StyledTitle = styled(Title)`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

export const StyledPriceText = styled(Text)`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

export const StyledDeletedPriceText = styled(Text)`
  margin-left: 1rem;
  text-decoration: line-through;
  color: grey;
`;

export const StyledTotalText = styled(Text)`
  margin-top: 0.5rem;
  font-size: 1rem;
  display: block;
  text-align: right;
  align-self: flex-end;
`;

export const StyledPriceSection = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

export const StyledOldPrice = styled.span`
  font-size: 0.85rem;
  color: gray;
  text-decoration: line-through;
`;

export const StyledNewPrice = styled.span`
  font-size: 1.15rem;
  font-weight: bold;
`;

export const StyledDiscount = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: red;
`;
