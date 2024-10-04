import { Button, Spin } from 'antd';
import styled from 'styled-components';

export const StyledCartButton = styled(Button)`
  height: 3rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.25rem;
  width: 100%;
`;

export const StyledCartContainer = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  align-items: center;
  gap: 10px;
`;

export const StyledQuantity = styled.span`
  font-size: 1.25rem;
  padding: 0 1rem;
  font-weight: bold;
`;

export const StyledSpin = styled(Spin)`
  margin: auto;
`;
