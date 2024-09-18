import {Login, Register} from 'features';
import React, {FC} from 'react';
import {useIsLoginStore} from 'shared/stores/isLoginStore';

export const AuthUi: FC = () => {
  const {isLoginPage} = useIsLoginStore();

  return <>({isLoginPage ? <Login /> : <Register />})</>;
};
