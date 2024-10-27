import { useEffect } from 'react';

import OrderList from 'entities/order/ui/OrderList/OrderList';
import { useProductStore } from 'entities/product/model/productStore';
import ProductList from 'entities/product/ui/productList/ProductList';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from 'shared/auth/model/authStore';

import {
  StyledButton,
  StyledDescriptions,
  StyledProfileSection,
  StyledTitle,
} from './UserDetails.styles';

const UserDetails = () => {
  const { logout, user } = useAuthStore();

  const { setSellerId, rezeroProductPage } = useProductStore();

  useEffect(() => {
    if (user?.id) {
      void rezeroProductPage();
      void setSellerId(user?.id);
    }
  }, [rezeroProductPage, setSellerId, user?.id]);

  const { t } = useTranslation();
  // TODO: переделать позже
  const handleLogout = () => {
    logout();
  };

  const getTranslatedRole = (role: string | undefined) => {
    if (!role) return t('Нет данных');
    return role === 'seller' ? t('Продавец') : t('Покупатель');
  };

  const items = [
    {
      key: '1',
      label: t('Пользователь'),
      children: user?.name || t('Нет данных'),
    },
    {
      key: '2',
      label: t('Email'),
      children: user?.email || t('Нет данных'),
    },
    {
      key: '3',
      label: t('Роль'),
      children: getTranslatedRole(user?.role),
    },
  ];

  const ProductListRender = () => {
    if (user?.role == 'seller') {
      return <ProductList />;
    }
  };
  const OrderListRender = () => {
    if (user?.role == 'buyer') {
      return <OrderList />;
    }
  };

  return (
    <StyledProfileSection>
      <StyledTitle>{t('Ваши товары')}</StyledTitle>
      <ProductListRender />
      <OrderListRender />
      <StyledDescriptions
        layout='vertical'
        title={t('Информация о пользователе')}
        bordered
        items={items}
      />
      <StyledButton type='primary' onClick={handleLogout}>
        {t('Выйти')}
      </StyledButton>
    </StyledProfileSection>
  );
};

export default UserDetails;
