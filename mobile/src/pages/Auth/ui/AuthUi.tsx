import React, {FC} from 'react';
import {Register} from 'features/Register';
import {Login} from 'features/Login/';
import {useIsLoginStore} from 'shared/stores/isLoginStore';

export const AuthUi: FC = () => {
  const {isLoginPage} = useIsLoginStore();
  return <>({isLoginPage ? <Login /> : <Register />})</>;
};
