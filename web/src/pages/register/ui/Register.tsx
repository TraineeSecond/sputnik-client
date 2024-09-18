import { RegisterForm } from 'features';
import { AuthFormParagraph, AuthFormTitle } from 'shared';

const Register = () => {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', marginTop: '50px' }}>
      <AuthFormTitle text='Регистрация' />
      <RegisterForm />
      <AuthFormParagraph
        question='Уже есть аккаунт?'
        linkText='Войти'
        linkTo='/login'
      />
    </div>
  );
};

export default Register;
