import { calculateDiscount, formatPriceRub } from 'shared';

import {
  StyledCard,
  StyledDiscount,
  StyledImage,
  StyledImageContainer,
  StyledImageLink,
  StyledNewPrice,
  StyledOldPrice,
  StyledPriceSection,
  StyledRow,
  StyledTitleLink,
} from './ProductCard.style';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  new_price: number;
  description: string;
}

interface PriceInfoProps {
  price: number;
  new_price: number;
}

const PriceRender = ({ price, new_price }: PriceInfoProps) => {
  const discount = calculateDiscount(price, new_price);

  return (
    <StyledPriceSection>
      <StyledNewPrice>{formatPriceRub(new_price)}</StyledNewPrice>
      {price !== new_price && (
        <>
          <StyledOldPrice>{formatPriceRub(price)}</StyledOldPrice>
          <StyledDiscount>{`-${discount}%`}</StyledDiscount>
        </>
      )}
    </StyledPriceSection>
  );
};

const ProductCard = ({ id, name, price, new_price }: ProductProps) => {
  const link = `/product/${id}`;

  return (
    <StyledCard>
      <StyledImageLink href={link} target='_blank' rel='noopener noreferrer'>
        <StyledImageContainer>
          <StyledImage
            src={`https://via.placeholder.com/200x300?text=${name}`}
            alt={name}
          />
        </StyledImageContainer>
      </StyledImageLink>
      <StyledRow>
        <StyledPriceSection>
          <PriceRender price={price} new_price={new_price} />
        </StyledPriceSection>
        <StyledTitleLink href={link} target='_blank' rel='noopener noreferrer'>
          {name}
        </StyledTitleLink>
      </StyledRow>
    </StyledCard>
  );
};

export default ProductCard;
