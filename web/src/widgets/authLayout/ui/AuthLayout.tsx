import React from 'react';

import { StyledContent } from './AuthLayout.styles';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <StyledContent>{children}</StyledContent>;
};

export default AuthLayout;
