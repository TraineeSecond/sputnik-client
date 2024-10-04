import React, { useEffect } from 'react';

import { useCartStore } from 'features/cart/model/cartStore';
import { useAuthStore } from 'shared/auth/model/authStore';
import { Header } from 'widgets';

import {
  StyledLayout,
  StyledLayoutContent,
  StyledLayoutHeader,
} from './MainLayout.styles';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { token, user } = useAuthStore();
  const { getCart } = useCartStore();

  useEffect(() => {
    if (user?.role === 'buyer' && token && user?.id) {
      void getCart(token, user.id);
    }
  }, [token, user, getCart]);

  return (
    <StyledLayout>
      <StyledLayoutHeader>
        <Header />
      </StyledLayoutHeader>
      <StyledLayoutContent>{children}</StyledLayoutContent>
    </StyledLayout>
  );
};

export default MainLayout;
