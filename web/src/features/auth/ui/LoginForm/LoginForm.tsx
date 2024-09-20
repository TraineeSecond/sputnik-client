import { message } from 'antd';
import { useAuthStore } from 'features/auth/model/authStore';

import {
  StyledButton,
  StyledFormItem,
  StyledInput,
  StyledLoginForm,
  StyledPasswordInput,
} from './LoginForm.styles';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { login } = useAuthStore();

  const handleLogin = async ({ email, password }: LoginFormValues) => {
    try {
      await login(email, password);
    } catch (error) {
      console.error('Ошибка при входе:', error);
      message.error(
        'Не удалось войти. Пожалуйста, проверьте ваши учетные данные.',
      );
    }
  };

  const emailRules = [{ required: true, message: 'Введите ваш email!' }];
  const passwordRules = [{ required: true, message: 'Введите ваш пароль!' }];

  return (
    <StyledLoginForm
      name='login'
      onFinish={(values) => handleLogin(values as LoginFormValues)}
    >
      <StyledFormItem name='email' rules={emailRules}>
        <StyledInput placeholder='Email' />
      </StyledFormItem>

      <StyledFormItem name='password' rules={passwordRules}>
        <StyledPasswordInput placeholder='Пароль' />
      </StyledFormItem>

      <StyledFormItem>
        <StyledButton type='primary' htmlType='submit' block>
          Войти
        </StyledButton>
      </StyledFormItem>
    </StyledLoginForm>
  );
};

export default LoginForm;
