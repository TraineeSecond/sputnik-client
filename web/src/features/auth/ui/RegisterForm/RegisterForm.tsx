import { useAuthStore } from '../../model/authStore';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Rule } from 'antd/lib/form';

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
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Пароли не совпадают!'));
    },
  },
];

const RegisterForm = () => {
  const [form] = Form.useForm();
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
    <Form
      form={form}
      name='register'
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onFinish={handleRegister}
      style={{ maxWidth: '400px', margin: '0 auto' }}
    >
      <Form.Item name='firstName' rules={getFirstNameRules()}>
        <Input placeholder='Имя' />
      </Form.Item>

      <Form.Item name='lastName' rules={getLastNameRules()}>
        <Input placeholder='Фамилия' />
      </Form.Item>

      <Form.Item name='email' rules={getEmailRules()}>
        <Input placeholder='Email' />
      </Form.Item>

      <Form.Item name='password' rules={getPasswordRules()}>
        <Input.Password placeholder='Пароль' />
      </Form.Item>

      <Form.Item
        name='confirmPassword'
        dependencies={['password']}
        rules={getConfirmPasswordRules(form.getFieldValue)}
      >
        <Input.Password placeholder='Повторить пароль' />
      </Form.Item>

      <Form.Item name='isSeller' valuePropName='checked'>
        <Checkbox>Стать продавцом</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' block>
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
