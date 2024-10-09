import { useCallback, useEffect } from 'react';

import { CartItem } from 'features';
import { useCartStore } from 'features/cart/model/cartStore';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from 'shared/auth/model/authStore';

import {
  StyledButton,
  StyledContainer,
  StyledText,
  StyledTitle,
  StyledTotalContainer,
  StyledWrapper,
} from './CartView.styles';

const CartView = () => {
  const {
    items,
    cartDetails,
    incrementCartItem,
    decrementCartItem,
    removeCartItem,
    loadCartDetails,
    getTotalPrice,
    loading,
  } = useCartStore();
  const { token, user } = useAuthStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (items.length === 0) return;
    void loadCartDetails();
  }, [items, loadCartDetails]);

  const handleIncrement = useCallback(
    (productid: number) => {
      if (token && user?.id) {
        void incrementCartItem(token, user.id, productid);
      }
    },
    [incrementCartItem, token, user],
  );

  const handleDecrement = useCallback(
    (productid: number) => {
      if (token && user?.id) {
        void decrementCartItem(token, user.id, productid);
      }
    },
    [decrementCartItem, token, user],
  );

  const handleRemove = useCallback(
    (productid: number) => {
      if (token && user?.id) {
        void removeCartItem(token, user.id, productid);
      }
    },
    [removeCartItem, token, user],
  );

  if (loading && items.length === 0) {
    return;
  }

  if (items.length === 0) {
    return <StyledText>{t('Ваша корзина пуста')}</StyledText>;
  }

  const renderCartItems = () => {
    return items.map((item) => {
      const product = cartDetails[item.productid];
      if (!product) return;

      return (
        <StyledWrapper key={item.productid}>
          <CartItem
            id={product.id}
            name={product.name}
            image={product.images[0]?.image}
            price={product.price}
            newPrice={product.new_price}
            quantity={item.quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={handleRemove}
          />
        </StyledWrapper>
      );
    });
  };

  return (
    <StyledContainer>
      <StyledTitle level={2}>{t('Ваша Корзина')}</StyledTitle>
      <div>{renderCartItems()}</div>
      <StyledTotalContainer>
        <StyledTitle
          level={3}
        >{`${t('Общая сумма:')} ${getTotalPrice()} ₽`}</StyledTitle>
        <StyledButton type='primary' size='large'>
          {t('Перейти к оплате')}
        </StyledButton>
      </StyledTotalContainer>
    </StyledContainer>
  );
};

export default CartView;
