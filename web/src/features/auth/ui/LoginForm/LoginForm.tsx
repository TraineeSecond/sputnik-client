import { useAuthStore } from '../../model/authStore';
import { Button, Form, Input, message } from 'antd';

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
    <Form
      name='login'
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onFinish={handleLogin}
      style={{ maxWidth: '400px', margin: '0 auto' }}
    >
      <Form.Item name='email' rules={emailRules}>
        <Input placeholder='Email' />
      </Form.Item>

      <Form.Item name='password' rules={passwordRules}>
        <Input.Password placeholder='Пароль' />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' block>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
