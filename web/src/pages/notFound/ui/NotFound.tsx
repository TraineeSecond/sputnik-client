import { Header } from 'widgets';

import { ErrorMessage, ErrorTitle, StyledLink } from './NotFound.styles';

const NotFound = () => {
  return (
    <>
      <Header />
      <ErrorMessage>
        <ErrorTitle>Произошла ошибка!</ErrorTitle>
        <StyledLink to='/'>Вернуться на главную</StyledLink>
      </ErrorMessage>
    </>
  );
};

export default NotFound;
