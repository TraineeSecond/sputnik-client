import {
  GlobalOutlined,
  HomeOutlined,
  PlusOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Badge } from 'antd';
import { useCartStore } from 'features/cart/model/cartStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'shared/auth/model/authStore';
import { changeLanguage } from 'shared/utils/i18nUtils/changeLanguage';

import {
  StyledButton,
  StyledContainer,
  StyledSearch,
  StyledSearchInput,
} from 'widgets/header/ui/Header.styles';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const userRole = user?.role;
  const { getQuantity } = useCartStore();
  const cartQuantity = getQuantity();

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
    <StyledContainer>
      <StyledButton
        size='large'
        icon={<HomeOutlined />}
        aria-label={t('Главная')}
        onClick={goToHome}
      />

      <StyledSearchInput>
        <StyledSearch size='large' placeholder={t('Поиск...')} enterButton />
      </StyledSearchInput>

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
        <Badge count={cartQuantity > 0 ? cartQuantity : 0}>
          <StyledButton
            size='large'
            icon={<ShoppingOutlined />}
            aria-label={t('Корзина')}
            onClick={goToCart}
          />
        </Badge>
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
  );
};

export default Header;
