import { Link } from 'react-router-dom';

interface AuthParagraphProps {
  question: string;
  linkText: string;
  linkTo: string;
}

const AuthParagraph = ({ question, linkText, linkTo }: AuthParagraphProps) => {
  return (
    <p style={{ textAlign: 'center' }}>
      {question} <Link to={linkTo}>{linkText}</Link>
    </p>
  );
};

export default AuthParagraph;
