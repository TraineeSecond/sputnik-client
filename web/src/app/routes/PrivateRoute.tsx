import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from 'shared/auth/model/authStore';

const PrivateRoute = () => {
  const { user } = useAuthStore();
  return user ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
