import styled from 'styled-components';

export const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, minmax(10rem, 1fr));
  width: 100%;
  padding: 0;
  padding-bottom: 1rem;
  margin: 0;
  gap: 1rem;
  list-style-type: none;
`;

export const StyledListItem = styled.li``;
