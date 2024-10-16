import { useEffect } from 'react';

import { UserDetails } from 'entities';
import { useProductStore } from 'entities/product/model/productStore';
import { useAuthStore } from 'shared/auth/model/authStore';
import { MainLayout } from 'widgets';

const Profile = () => {
  const { setSellerId } = useProductStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.id) {
      void setSellerId(user?.id);
    }
  }, [setSellerId, user?.id]);

  return (
    <MainLayout>
      <UserDetails />
    </MainLayout>
  );
};

export default Profile;
