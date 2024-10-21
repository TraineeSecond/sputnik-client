import { Rate } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 0.5rem;

  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 15rem;
  overflow: hidden;
  cursor: pointer;
  border-radius: 0.5rem;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StyledRow = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.5rem;
  padding: 0.5rem;
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

export const StyledTitleLink = styled(Link)`
  margin: 0;
  overflow: hidden;
  font-size: 1.15rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  color: black;
  text-decoration: none;

  &:hover {
    color: blue;
    text-decoration: none;
  }
`;

export const StyledImageLink = styled(Link)`
  &:hover + ${StyledRow} ${StyledTitleLink} {
    color: blue;
    text-decoration: none;
  }
`;

export const StyledRate = styled(Rate)``;
