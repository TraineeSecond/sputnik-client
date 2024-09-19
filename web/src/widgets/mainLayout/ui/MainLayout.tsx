import React from 'react';

import { Header } from 'widgets';

import {
  StyledLayout,
  StyledLayoutContent,
  StyledLayoutHeader,
} from './MainLayout.styles';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
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
