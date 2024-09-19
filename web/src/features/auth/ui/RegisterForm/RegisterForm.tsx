import { message } from 'antd';
import { Rule } from 'antd/lib/form';
import { useAuthStore } from 'features/auth/model/authStore';

import {
  StyledButton,
  StyledCheckbox,
  StyledForm,
  StyledFormItem,
  StyledInput,
  StyledPasswordInput,
} from './RegisterForm.styles';

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isSeller: boolean;
}

const getFirstNameRules = (): Rule[] => [
  { required: true, message: 'Введите ваше имя!' },
];

const getLastNameRules = (): Rule[] => [
  { required: true, message: 'Введите вашу фамилию!' },
];

const getEmailRules = (): Rule[] => [
  { required: true, message: 'Введите ваш email!' },
  { type: 'email', message: 'Введите корректный email!' },
];

const getPasswordRules = (): Rule[] => [
  { required: true, message: 'Введите ваш пароль!' },
];

const getConfirmPasswordRules = (
  getFieldValue: (field: string) => string,
): Rule[] => [
  { required: true, message: 'Повторите ваш пароль!' },
  {
    validator(_, value: string) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Пароли не совпадают!'));
    },
  },
];

const RegisterForm = () => {
  const [form] = StyledForm.useForm();
  const { register } = useAuthStore();

  const handleRegister = async (values: RegisterFormValues) => {
    const { firstName, lastName, email, password, isSeller } = values;

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
      message.error(
        'Не удалось зарегистрироваться. Пожалуйста, попробуйте снова.',
      );
    }
  };

  return (
    <StyledForm
      form={form}
      name='register'
      onFinish={(values) => handleRegister(values as RegisterFormValues)}
    >
      <StyledFormItem name='firstName' rules={getFirstNameRules()}>
        <StyledInput placeholder='Имя' />
      </StyledFormItem>

      <StyledFormItem name='lastName' rules={getLastNameRules()}>
        <StyledInput placeholder='Фамилия' />
      </StyledFormItem>

      <StyledFormItem name='email' rules={getEmailRules()}>
        <StyledInput placeholder='Email' />
      </StyledFormItem>

      <StyledFormItem name='password' rules={getPasswordRules()}>
        <StyledPasswordInput placeholder='Пароль' />
      </StyledFormItem>

      <StyledFormItem
        name='confirmPassword'
        dependencies={['password']}
        rules={getConfirmPasswordRules(form.getFieldValue)}
      >
        <StyledPasswordInput placeholder='Повторить пароль' />
      </StyledFormItem>

      <StyledFormItem name='isSeller' valuePropName='checked'>
        <StyledCheckbox>Стать продавцом</StyledCheckbox>
      </StyledFormItem>

      <StyledFormItem>
        <StyledButton type='primary' htmlType='submit' block>
          Зарегистрироваться
        </StyledButton>
      </StyledFormItem>
    </StyledForm>
  );
};

export default RegisterForm;
