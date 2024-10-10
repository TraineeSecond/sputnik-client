import { Carousel, Rate } from 'antd';
import styled from 'styled-components';

export const StyledProductView = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const StyledProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const StyledProductImage = styled.img`
  height: 350px;
  border-radius: 0.5rem;
`;

export const StyledCarousel = styled(Carousel)`
  width: 100%;
  .slick-slide img {
    max-width: 100%;
    max-height: 350px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

export const StyledProductDetails = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledPriceSection = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
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

export const StyledH1 = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

export const StyledP = styled.p`
  font-size: 1rem;
`;

export const StyledWrapper = styled.div`
  display: flex;
  width: 20rem;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StyledRate = styled(Rate)`
  font-size: 1.25rem;
  color: #fadb14;
  margin-bottom: 1rem;
`;
