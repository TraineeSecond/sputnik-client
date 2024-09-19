import { blue } from '@ant-design/colors';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
`;

export const StyledH1 = styled.h1`
  font-size: 2rem;
  color: black;
  font-weight: bold;
`;

export const StyledLink = styled(Link)`
  font-size: 1.125rem;
  color: ${blue[5]};
  text-decoration: none;

  &:hover {
    color: ${blue[7]};
    text-decoration: none;
  }
`;
