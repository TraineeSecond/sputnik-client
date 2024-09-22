import { RegisterForm } from 'features';
import { AuthFormParagraph, AuthFormTitle } from 'shared';
import { AuthLayout } from 'widgets';

const Register = () => {
  return (
    <AuthLayout>
      <AuthFormTitle text='Регистрация' />
      <RegisterForm />
      <AuthFormParagraph
        question='Уже есть аккаунт?'
        linkText='Войти'
        linkTo='/login'
      />
    </AuthLayout>
  );
};

export default Register;
