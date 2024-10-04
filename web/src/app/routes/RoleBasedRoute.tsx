import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from 'shared/auth/model/authStore';

import { UserRole } from 'shared/auth/model/types';

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
