import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import {
  StyledCard,
  StyledImg,
  StyledList,
  StyledListItem,
  StyledMainInfoContainer,
  StyledProductContainer,
  StyledText,
} from './Order.style';

import { OrderItem, Order as OrderType } from 'entities/order/model/types';

interface OrderProps {
  order: OrderType;
}

const Order = ({ order }: OrderProps) => {
  const { t } = useTranslation();

  const totalPrice = useMemo(() => {
    return order.orderitems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }, [order.orderitems]);

  const AddressRender = () => {
    if (order.point?.address) {
      return (
        <StyledText strong>
          {t('Пункт выдачи')}: {order.point?.address}
        </StyledText>
      );
    }
  };

  const DateRender = () => {
    if (order.datestring) {
      return (
        <StyledText strong>
          {t('Дата доставки')}: {order.datestring}
        </StyledText>
      );
    }
  };

  return (
    <StyledCard>
      <StyledMainInfoContainer>
        <StyledText strong>
          {t('Заказ')}: #{order.id}
        </StyledText>
        <AddressRender />
        <DateRender />
        <StyledText strong>{totalPrice}₽</StyledText>
      </StyledMainInfoContainer>

      <StyledText strong>{t('товары')}:</StyledText>
      <StyledList
        grid={{ gutter: 16, column: 6 }}
        dataSource={order.orderitems}
        renderItem={(item: OrderItem) => (
          <StyledListItem>
            <StyledProductContainer>
              <StyledImg
                src={
                  item.product.images[0]?.image ||
                  `https://via.placeholder.com/200x300?text=${item.product.name}`
                }
              />
              <StyledText>
                {item.product.name} ({t('количество')}: {item.quantity})
              </StyledText>
            </StyledProductContainer>
          </StyledListItem>
        )}
      />
    </StyledCard>
  );
};

export default Order;
