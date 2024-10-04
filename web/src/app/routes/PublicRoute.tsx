import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from 'shared/auth/model/authStore';

const PublicRoute = () => {
  const { user } = useAuthStore();
  return !user ? <Outlet /> : <Navigate to='/' replace />;
};

export default PublicRoute;
