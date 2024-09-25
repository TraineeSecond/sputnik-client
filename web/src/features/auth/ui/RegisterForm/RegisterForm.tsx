import { Rule } from 'antd/lib/form';
import { useAuthStore } from 'features/auth/model/authStore';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  StyledButton,
  StyledCheckbox,
  StyledForm,
  StyledFormItem,
  StyledInput,
  StyledParagraph,
  StyledPasswordInput,
  StyledTitle,
} from './RegisterForm.styles';

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isSeller: boolean;
}

const RegisterForm = () => {
  const [form] = StyledForm.useForm();
  const { register } = useAuthStore();
  const { t } = useTranslation();

  const firstNameRules: Rule[] = [
    { required: true, message: t('Введите ваше имя') },
  ];

  const lastNameRules: Rule[] = [
    { required: true, message: t('Введите вашу фамилию') },
  ];

  const emailRules: Rule[] = [
    { required: true, message: t('Введите ваш email') },
    { type: 'email', message: t('Введите корректный email') },
  ];

  const passwordRules: Rule[] = [
    { required: true, message: t('Введите ваш пароль') },
  ];

  const getConfirmPasswordRules = (
    getFieldValue: (field: string) => string,
  ): Rule[] => [
    { required: true, message: t('Повторите ваш пароль') },
    {
      validator(_, value: string) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(t('Пароли не совпадают')));
      },
    },
  ];

  const handleSubmit = async (values: unknown) => {
    const { firstName, lastName, email, password, isSeller } =
      values as RegisterFormValues;

    try {
      await register({
        name: firstName,
        surname: lastName,
        email,
        password,
        role: isSeller ? 'seller' : 'buyer',
      });
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
    }
  };

  return (
    <StyledForm
      form={form}
      name='register'
      layout='vertical'
      size='large'
      onFinish={handleSubmit}
    >
      <StyledTitle level={2}>{t('Регистрация')}</StyledTitle>

      <StyledFormItem name='firstName' rules={firstNameRules}>
        <StyledInput placeholder={t('Имя')} />
      </StyledFormItem>

      <StyledFormItem name='lastName' rules={lastNameRules}>
        <StyledInput placeholder={t('Фамилия')} />
      </StyledFormItem>

      <StyledFormItem name='email' rules={emailRules}>
        <StyledInput placeholder={t('Email')} />
      </StyledFormItem>

      <StyledFormItem name='password' rules={passwordRules}>
        <StyledPasswordInput placeholder={t('Пароль')} />
      </StyledFormItem>

      <StyledFormItem
        name='confirmPassword'
        dependencies={['password']}
        rules={getConfirmPasswordRules(form.getFieldValue)}
      >
        <StyledPasswordInput placeholder={t('Повторить пароль')} />
      </StyledFormItem>

      <StyledFormItem name='isSeller' valuePropName='checked'>
        <StyledCheckbox>{t('Стать продавцом')}</StyledCheckbox>
      </StyledFormItem>

      <StyledFormItem>
        <StyledButton type='primary' htmlType='submit' block>
          {t('Зарегистрироваться')}
        </StyledButton>
      </StyledFormItem>
      <StyledParagraph>
        {t('Уже есть аккаунт?')} <Link to='/login'>{t('Войти')}</Link>
      </StyledParagraph>
    </StyledForm>
  );
};

export default RegisterForm;
