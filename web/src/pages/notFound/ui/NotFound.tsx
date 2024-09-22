import { MainLayout } from 'widgets';

import { StyledH1, StyledLink, StyledSection } from './NotFound.styles';

const NotFound = () => {
  return (
    <MainLayout>
      <StyledSection>
        <StyledH1>Произошла ошибка!</StyledH1>
        <StyledLink to='/'>Вернуться на главную</StyledLink>
      </StyledSection>
    </MainLayout>
  );
};

export default NotFound;
