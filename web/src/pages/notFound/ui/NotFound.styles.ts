import { blue } from '@ant-design/colors';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ErrorMessage = styled.div`
  margin-top: 50px;
`;

export const ErrorTitle = styled.h1`
  font-size: 32px;
  color: black;
  font-weight: bold;
`;

export const StyledLink = styled(Link)`
  font-size: 18px;
  color: ${blue[5]};
  text-decoration: none;

  &:hover {
    color: ${blue[7]};
    text-decoration: none;
  }
`;
