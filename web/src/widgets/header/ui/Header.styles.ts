import styled from 'styled-components';

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const SearchInputStyled = styled.div`
  flex-grow: 1;
`;

const styles = {
  header: HeaderStyled,
  searchInput: SearchInputStyled,
};

export default styles;
