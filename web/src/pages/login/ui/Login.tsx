import { LoginForm } from 'features';
import { AuthFormParagraph, AuthFormTitle } from 'shared';
import { AuthLayout } from 'widgets';

const Login = () => {
  return (
    <AuthLayout>
      <AuthFormTitle text='Вход' />
      <LoginForm />
      <AuthFormParagraph
        question='Нет аккаунта?'
        linkText='Зарегистрироваться'
        linkTo='/register'
      />
    </AuthLayout>
  );
};

export default Login;
