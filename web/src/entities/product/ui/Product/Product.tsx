import { Product as ProductInterface } from 'entities/product/model/types';
import React from 'react';
import { StyledCard, StyledDescriptionText, StyledRow, StyledText, StyledTitle } from './Product.style';
import { StyledButton } from 'widgets/header/ui/Header.styles';

interface ProductProps extends Omit<ProductInterface, 'user'> {
  user: {
    name: string;
  };
}

interface PriceInfoProps {
  price: number,
  new_price: number
}
const PriceRender: React.FC<PriceInfoProps> = ({ price, new_price }) => {
  if (price == new_price) {
    return <StyledText strong>{price}Р</StyledText>
  }
  return <><StyledText delete>{price}Р</StyledText> <StyledText strong>{new_price}Р</StyledText></>

}

const Product: React.FC<ProductProps> = ({
  name,
  category,
  description,
  price,
  new_price,
  user,
}) => {
  return (
    <StyledCard
      hoverable
      cover={
        <img
          alt={name}
          src={`https://via.placeholder.com/300x200?text=${name}`}
        />
      }
    >
      <StyledRow>
        <StyledTitle level={4}>{name}</StyledTitle>
        <StyledText type='secondary'>категория: {category}</StyledText>
        <StyledDescriptionText>описание: {description}</StyledDescriptionText>
        <StyledText>
          {"цена: "}
          <PriceRender price={price} new_price={new_price} />
        </StyledText>
        <StyledButton type='primary'>перейти</StyledButton>
        <StyledText type='secondary'>продавец: {user.name}</StyledText>
      </StyledRow>
    </StyledCard >
  );
};

export default Product;
