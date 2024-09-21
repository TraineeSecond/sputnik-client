import React from 'react';
import {Login, Register} from 'features';
import {useIsLoginStore} from 'shared/stores/isLoginStore';

export const Auth = () => {
  const {isLoginPage} = useIsLoginStore();
  return <>({isLoginPage ? <Login /> : <Register />})</>;
};
