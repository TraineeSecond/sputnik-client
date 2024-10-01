import { useTranslation } from 'react-i18next';
import { useAuthStore } from 'shared/auth/model/authStore';

import {
  StyledButton,
  StyledDescriptions,
  StyledProfileSection,
} from './UserDetails.styles';

const UserDetails = () => {
  const { logout, user } = useAuthStore();
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

  return (
    <StyledProfileSection>
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
