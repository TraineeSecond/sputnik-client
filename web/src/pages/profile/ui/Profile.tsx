import { useAuthStore } from 'features/auth/model/authStore';
import { MainLayout } from 'widgets';

import {
  ProfileSection,
  StyledButton,
  StyledH1,
  StyledParagraph,
} from './Profile.styles';

const Profile = () => {
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <MainLayout>
      <ProfileSection>
        <StyledH1>Ваш профиль</StyledH1>
        <StyledParagraph>Пользователь: {user?.name}!</StyledParagraph>
        <StyledParagraph>Роль: {user?.role}!</StyledParagraph>
        <StyledParagraph>Email: {user?.email}!</StyledParagraph>
        <StyledButton type='primary' onClick={handleLogout}>
          Выйти из аккаунта
        </StyledButton>
      </ProfileSection>
    </MainLayout>
  );
};

export default Profile;
