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
  StyledRate,
  StyledRow,
  StyledTitleLink,
} from './ProductCard.style';

interface ProductImage {
  id: number;
  image: string;
  productid: number;
}

interface ProductProps {
  id: number;
  name: string;
  price: number;
  new_price: number;
  description: string;
  rating: number;
  images: ProductImage[];
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

const ProductCard = ({
  id,
  name,
  price,
  new_price,
  images,
  rating,
}: ProductProps) => {
  const imageUrl =
    images.length > 0
      ? images[0].image
      : `https://via.placeholder.com/200x300?text=${name}`;
  const link = `/product/${id}`;

  return (
    <StyledCard>
      <StyledImageLink href={link} target='_blank' rel='noopener noreferrer'>
        <StyledImageContainer>
          <StyledImage
            src={imageUrl}
            alt={`https://via.placeholder.com/200x300?text=${name}`}
          />
        </StyledImageContainer>
      </StyledImageLink>
      <StyledRow>
        <StyledRate disabled value={rating} />
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
