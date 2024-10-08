import { memo } from 'react';

import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { calculateDiscount, formatPriceRub } from 'shared';

import {
  StyledButton,
  StyledButtonGroup,
  StyledCard,
  StyledContainer,
  StyledDiscount,
  StyledImage,
  StyledItemDetails,
  StyledNewPrice,
  StyledOldPrice,
  StyledPriceSection,
  StyledQuantity,
  StyledTitle,
  StyledTotalContainer,
  StyledTotalText,
} from './CartItem.styles';

type CartItemProps = {
  id: number;
  name: string;
  image: string;
  price: number;
  newPrice: number;
  discount?: boolean;
  quantity: number;
  onIncrement: (productId: number) => void;
  onDecrement: (productId: number) => void;
  onRemove: (productId: number) => void;
};

const PriceRender = ({
  price,
  newPrice,
}: {
  price: number;
  newPrice: number;
}) => {
  const discount = calculateDiscount(price, newPrice);

  return (
    <StyledPriceSection>
      <StyledNewPrice>{formatPriceRub(newPrice)}</StyledNewPrice>
      {newPrice < price && (
        <>
          <StyledOldPrice>{formatPriceRub(price)}</StyledOldPrice>
          <StyledDiscount>{`-${discount}%`}</StyledDiscount>
        </>
      )}
    </StyledPriceSection>
  );
};

const CartItem = memo(
  ({
    id,
    name,
    image,
    price,
    newPrice,
    quantity,
    onIncrement,
    onDecrement,
    onRemove,
  }: CartItemProps) => {
    const { t } = useTranslation();

    const total = quantity * (newPrice < price ? newPrice : price);
    const productImage =
      image || `https://via.placeholder.com/200x300?text=${name}`;

    const handleIncrement = () => onIncrement(id);
    const handleDecrement = () => onDecrement(id);
    const handleRemove = () => onRemove(id);

    return (
      <StyledCard bordered>
        <StyledContainer>
          <StyledImage src={productImage} alt={name} />
          <StyledItemDetails>
            <StyledTitle level={3}>{name}</StyledTitle>
            <PriceRender price={price} newPrice={newPrice} />
          </StyledItemDetails>
          <StyledTotalContainer>
            <StyledButtonGroup>
              <StyledButton
                icon={<DeleteOutlined />}
                size='large'
                shape='circle'
                onClick={handleRemove}
              />
              <StyledButton
                icon={<MinusOutlined />}
                size='large'
                onClick={handleDecrement}
                shape='circle'
              />
              <StyledQuantity>{quantity}</StyledQuantity>
              <StyledButton
                icon={<PlusOutlined />}
                size='large'
                onClick={handleIncrement}
                shape='circle'
              />
            </StyledButtonGroup>
            <StyledTotalText>
              {`${t('Общая сумма:')} ${formatPriceRub(total)}`}
            </StyledTotalText>
          </StyledTotalContainer>
        </StyledContainer>
      </StyledCard>
    );
  },
);

export default CartItem;
