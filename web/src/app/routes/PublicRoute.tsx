import { useAuthStore } from 'features/auth/model/authStore';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const { user } = useAuthStore();
  return !user ? <Outlet /> : <Navigate to='/' replace />;
};

export default PublicRoute;
