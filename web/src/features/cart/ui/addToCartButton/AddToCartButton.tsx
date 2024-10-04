import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  StyledCartButton,
  StyledCartContainer,
  StyledQuantity,
  StyledSpin,
} from './AddToCartButton.styles';

type AddToCartButtonProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  loading: boolean;
};

const AddToCartButton = ({
  quantity,
  onIncrement,
  onDecrement,
  loading,
}: AddToCartButtonProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToCart = () => {
    navigate('/cart');
  };

  if (loading) {
    return (
      <StyledCartContainer>
        <StyledSpin size='large' />
      </StyledCartContainer>
    );
  }

  if (quantity > 0) {
    return (
      <StyledCartContainer>
        <StyledCartButton type='primary' onClick={goToCart}>
          {t('В корзину')}
        </StyledCartButton>
        <StyledCartButton onClick={onDecrement}>-</StyledCartButton>
        <StyledQuantity>{quantity}</StyledQuantity>
        <StyledCartButton onClick={onIncrement}>+</StyledCartButton>
      </StyledCartContainer>
    );
  }

  return (
    <StyledCartButton type='primary' onClick={onIncrement}>
      {t('Добавить в корзину')}
    </StyledCartButton>
  );
};

export default AddToCartButton;
