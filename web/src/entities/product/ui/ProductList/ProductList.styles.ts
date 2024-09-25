import styled from 'styled-components';

const ProductListStyled = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  margin-bottom: 1rem;
`;

const styles = {
  list: ProductListStyled,
};

export default styles;
