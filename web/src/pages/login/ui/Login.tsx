import { LoginForm } from 'features';
import { AuthFormParagraph, AuthFormTitle } from 'shared';

const Login = () => {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <AuthFormTitle text='Вход' />
      <LoginForm />
      <AuthFormParagraph
        question='Нет аккаунта?'
        linkText='Зарегистрироваться'
        linkTo='/register'
      />
    </div>
  );
};

export default Login;
