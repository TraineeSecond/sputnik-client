import { Link } from 'react-router-dom';

import { StyledParagraph } from './AuthFormParagraph.styles';

interface AuthParagraphProps {
  question: string;
  linkText: string;
  linkTo: string;
}

const AuthParagraph = ({ question, linkText, linkTo }: AuthParagraphProps) => {
  return (
    <StyledParagraph>
      {question} <Link to={linkTo}>{linkText}</Link>
    </StyledParagraph>
  );
};

export default AuthParagraph;
