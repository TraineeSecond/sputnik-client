import { useState } from 'react';

import {
  FilterOutlined,
  GlobalOutlined,
  HomeOutlined,
  PlusOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useProductStore } from 'entities/product/model/productStore';
import { FilterForm } from 'features';
import { useCartStore } from 'features/cart/model/cartStore';
import { useFiltersStore } from 'features/filters/model/filtersStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'shared/auth/model/authStore';
import { changeLanguage } from 'shared/utils/i18nUtils/changeLanguage';

import {
  StyledBadge,
  StyledButton,
  StyledContainer,
  StyledSearch,
  StyledSearchInput,
} from './Header.styles';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { setSortName } = useProductStore();
  const { getQuantity } = useCartStore();
  const { toggleShowFilterPopUp } = useFiltersStore();
  const [sortTerm, setSortTerm] = useState('');

  const userRole = user?.role;
  const cartQuantity = getQuantity();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortTerm(e.target.value);
  };

  const handleSearchEnter = (value: string) => {
    void setSortName(value);
  };

  const goToHome = () => {
    navigate('/');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const goToCreateListing = () => {
    navigate('/create-listing');
  };

  return (
    <>
      <StyledContainer>
        <StyledButton
          size='large'
          icon={<HomeOutlined />}
          aria-label={t('Главная')}
          onClick={goToHome}
        />

        <StyledSearchInput>
          <StyledSearch
            size='large'
            enterButton
            placeholder={t('Поиск...')}
            onChange={handleSearchChange}
            onSearch={handleSearchEnter}
            value={sortTerm}
          />
        </StyledSearchInput>

        <StyledButton
          size='large'
          icon={<FilterOutlined />}
          aria-label={'фильтр'}
          onClick={toggleShowFilterPopUp}
        />

        <StyledButton
          size='large'
          icon={<GlobalOutlined />}
          aria-label={t('Сменить язык')}
          onClick={changeLanguage}
        />

        <StyledButton
          size='large'
          icon={<UserOutlined />}
          aria-label={t('Профиль')}
          onClick={goToProfile}
        />

        {userRole === 'buyer' && (
          <StyledBadge count={cartQuantity}>
            <StyledButton
              size='large'
              icon={<ShoppingOutlined />}
              aria-label={t('Корзина')}
              onClick={goToCart}
            />
          </StyledBadge>
        )}

        {userRole === 'seller' && (
          <StyledButton
            size='large'
            icon={<PlusOutlined />}
            aria-label={t('Выставить товар')}
            onClick={goToCreateListing}
          />
        )}
      </StyledContainer>
      <FilterForm />
    </>
  );
};

export default Header;
