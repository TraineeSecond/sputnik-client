import { useAuthStore } from 'features/auth/model/authStore';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { user } = useAuthStore();
  return user ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
