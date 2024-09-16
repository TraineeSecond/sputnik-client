import { useTranslation } from 'react-i18next';

import { StyledH1 } from 'app/App.styles';

function App() {
  const { t } = useTranslation();

  return (
    <>
      <StyledH1>{t('заголовок')}</StyledH1>
    </>
  );
}

export default App;
