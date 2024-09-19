import React from 'react';

import { StyledContainer, StyledContent } from './AuthLayout.styles';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledContainer>
      <StyledContent>{children}</StyledContent>
    </StyledContainer>
  );
};

export default AuthLayout;
