import { Suspense, lazy } from 'react';

import { AuthLayout } from 'widgets';

const RegisterForm = lazy(() =>
  import('shared').then((module) => ({ default: module.RegisterForm })),
);

const Register = () => {
  return (
    <AuthLayout>
      <Suspense fallback={<></>}>
        <RegisterForm />
      </Suspense>
    </AuthLayout>
  );
};

export default Register;
