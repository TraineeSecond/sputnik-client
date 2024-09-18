import { Button } from 'antd';
import { useAuthStore } from 'features/auth/model/authStore';
import { Header } from 'widgets';

const Profile = () => {
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Header />
      <div style={{ marginTop: '20px' }}>
        <h1>User.name {user?.name}!</h1>
        <h1>User.role {user?.role}!</h1>
        <p>This is your profile.</p>
        <Button type='primary' onClick={handleLogout}>
          Выйти из аккаунта
        </Button>
      </div>
    </>
  );
};

export default Profile;
