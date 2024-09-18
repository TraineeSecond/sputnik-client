import {
  GlobalOutlined,
  HomeOutlined,
  PlusOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useAuthStore } from 'features/auth/model/authStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { changeLanguage } from 'shared/utils/i18nUtils/changeLanguage';

import styles from 'widgets/header/ui/Header.styles';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const userRole = user?.role;

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
    <styles.header>
      <Button
        size='large'
        icon={<HomeOutlined />}
        aria-label={t('menu.home')}
        onClick={goToHome}
      />

      <styles.searchInput>
        <Input.Search
          size='large'
          placeholder={t('header.searchPlaceholder')}
          enterButton
        />
      </styles.searchInput>

      <Button
        size='large'
        icon={<GlobalOutlined />}
        aria-label={t('header.changeLanguage')}
        onClick={changeLanguage}
      />

      <Button
        size='large'
        icon={<UserOutlined />}
        aria-label={t('header.profile')}
        onClick={goToProfile}
      />

      {userRole === 'buyer' && (
        <Button
          size='large'
          icon={<ShoppingOutlined />}
          aria-label={t('header.cart')}
          onClick={goToCart}
        />
      )}

      {userRole === 'seller' && (
        <Button
          size='large'
          icon={<PlusOutlined />}
          aria-label={t('header.createProduct')}
          onClick={goToCreateListing}
        />
      )}
    </styles.header>
  );
};

export default Header;
