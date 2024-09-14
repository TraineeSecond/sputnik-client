import { useState } from 'react';

import { useTranslation } from 'react-i18next';

function App() {
  // Для проверки i18n
  const [count, setCount] = useState(0);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <h1>{t('title')}</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          {t('countMessage', { count })}
        </button>

        <div>
          <button onClick={() => changeLanguage('en')}>English</button>
          <button onClick={() => changeLanguage('ru')}>Русский</button>
        </div>

        <p>{t('editText')}</p>
      </div>
    </>
  );
}

export default App;
