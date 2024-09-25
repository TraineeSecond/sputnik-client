import { useAuthStore } from 'features/auth/model/authStore';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  StyledButton,
  StyledFormItem,
  StyledInput,
  StyledLoginForm,
  StyledParagraph,
  StyledPasswordInput,
  StyledTitle,
} from './LoginForm.styles';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { login } = useAuthStore();
  const { t } = useTranslation();

  const emailRules = [{ required: true, message: t('Введите ваш email') }];
  const passwordRules = [{ required: true, message: t('Введите ваш пароль') }];

  const handleSubmit = async (values: unknown) => {
    const { email, password } = values as LoginFormValues;

    try {
      await login(email, password);
    } catch (error) {
      console.error('Ошибка при входе:', error);
    }
  };

  return (
    <StyledLoginForm name='login' layout='vertical' onFinish={handleSubmit}>
      <StyledTitle level={2}>{t('Вход')}</StyledTitle>

      <StyledFormItem name='email' rules={emailRules}>
        <StyledInput placeholder={t('Email')} />
      </StyledFormItem>

      <StyledFormItem name='password' rules={passwordRules}>
        <StyledPasswordInput placeholder={t('Пароль')} />
      </StyledFormItem>

      <StyledFormItem>
        <StyledButton type='primary' htmlType='submit' block>
          {t('Войти')}
        </StyledButton>
      </StyledFormItem>

      <StyledParagraph>
        {t('Нет аккаунта?')}{' '}
        <Link to='/register'>{t('Зарегистрироваться')}</Link>
      </StyledParagraph>
    </StyledLoginForm>
  );
};

export default LoginForm;
