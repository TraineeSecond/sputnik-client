import { useEffect } from 'react';

import { useOrderStore } from 'entities/order/model/orderStore';
import { usePointsStore } from 'entities/points/model/pointsStore';
import Map from 'entities/points/ui/Map';
import { useCartStore } from 'features/cart/model/cartStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useDeliveryViewStore } from '../model/DeliveryViewStore';
import {
  StyledButton,
  StyledDatePicker,
  StyledDeliveryViewContainer,
  StyledForm,
  StyledFormContainer,
  StyledFormItem,
  StyledMapContainer,
  StyledSelect,
  StyledSelectOption,
} from './DeliveryView.style';

const DeliveryView = () => {
  const { points, loadPoints } = usePointsStore();
  const { deliveryDate, selectedPointId, setSelectedPointId, setDeliveryDate } =
    useDeliveryViewStore();
  const navigate = useNavigate();
  const { items } = useCartStore();
  const { addOrder } = useOrderStore();

  const { t } = useTranslation();

  useEffect(() => {
    void loadPoints();
  }, [loadPoints]);

  const handleChangeDate = (_date: unknown, dateString: string | string[]) => {
    if (typeof dateString === 'string') {
      setDeliveryDate(dateString);
    }
  };

  const handleSubmit = async () => {
    await addOrder(items, selectedPointId, deliveryDate);
    navigate('/profile');
  };

  return (
    <StyledDeliveryViewContainer>
      <StyledMapContainer>
        <Map />
      </StyledMapContainer>

      <StyledFormContainer>
        <StyledForm layout='vertical' onFinish={handleSubmit}>
          <StyledFormItem label={t('Пункт выдачи')}>
            <StyledSelect
              placeholder={t('выберите точку')}
              value={selectedPointId}
              onChange={setSelectedPointId}
            >
              {points.map((point) => (
                <StyledSelectOption key={point.id} value={point.id}>
                  {point.name}
                </StyledSelectOption>
              ))}
            </StyledSelect>
          </StyledFormItem>
          <StyledFormItem label={t('Дата заказа')}>
            <StyledDatePicker
              onChange={handleChangeDate}
              placeholder={t('укажите дату')}
            />
          </StyledFormItem>
          <StyledFormItem>
            <StyledButton type='primary' htmlType='submit'>
              {t('Оформить доставку')}
            </StyledButton>
          </StyledFormItem>
        </StyledForm>
      </StyledFormContainer>
    </StyledDeliveryViewContainer>
  );
};

export default DeliveryView;
