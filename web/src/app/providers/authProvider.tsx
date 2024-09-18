import { useEffect } from 'react';

import { useAuthStore } from 'features/auth/model/authStore';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { loadUserFromToken, isLoading } = useAuthStore();

  useEffect(() => {
    loadUserFromToken();
  }, [loadUserFromToken]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};

export default AuthProvider;
