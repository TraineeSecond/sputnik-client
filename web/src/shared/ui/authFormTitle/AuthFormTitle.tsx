import { Typography } from 'antd';

const { Title } = Typography;

interface AuthTitleProps {
  text: string;
}

const AuthTitle = ({ text }: AuthTitleProps) => {
  return (
    <Title level={2} style={{ textAlign: 'center', marginTop: '50px' }}>
      {text}
    </Title>
  );
};

export default AuthTitle;
