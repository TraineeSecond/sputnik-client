import { Card, List, Typography } from 'antd';
import styled from 'styled-components';

import { OrderItem } from 'entities/order/model/types';

const { Text } = Typography;

export const StyledCard = styled(Card)`
  margin-bottom: 16px;
`;

export const StyledMainInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const StyledText = styled(Text)``;

export const StyledList = styled(List<OrderItem>)``;

export const StyledListItem = styled(List.Item)``;

export const StyledProductContainer = styled.div`
  display: grid;
`;

export const StyledImg = styled.img`
  width: 200px;
  height: 200px;
`;
