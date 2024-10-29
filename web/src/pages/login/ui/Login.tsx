import { Suspense, lazy } from 'react';

import { AuthLayout } from 'widgets';

const LoginForm = lazy(() =>
  import('shared').then((module) => ({ default: module.LoginForm })),
);

const Login = () => {
  return (
    <AuthLayout>
      <Suspense fallback={<></>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
};

export default Login;
