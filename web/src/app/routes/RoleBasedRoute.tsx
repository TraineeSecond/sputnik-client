import { UserRole } from 'entities/user/model/types';
import { useAuthStore } from 'features/auth/model/authStore';
import { Navigate, Outlet } from 'react-router-dom';

interface RoleBasedRouteProps {
  allowedRoles: UserRole[];
  redirectPath?: string;
}

const RoleBasedRoute = ({
  allowedRoles,
  redirectPath = '/',
}: RoleBasedRouteProps) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;
