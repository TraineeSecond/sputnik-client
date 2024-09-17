import React, {FC} from 'react';
import {useAuthStore} from '../model/store';
import {Register} from 'features/Register';
import {Login} from 'features/Login/';

export const AuthUi: FC = () => {
  const {isLoginPage} = useAuthStore();
  return <>({isLoginPage ? <Login /> : <Register />})</>;
};
