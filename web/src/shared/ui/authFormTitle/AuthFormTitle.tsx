import { StyledTitle } from './AuthFormTitle.styles';

interface AuthTitleProps {
  text: string;
}

const AuthTitle = ({ text }: AuthTitleProps) => {
  return <StyledTitle level={2}>{text}</StyledTitle>;
};

export default AuthTitle;
