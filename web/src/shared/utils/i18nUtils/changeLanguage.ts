import i18n from 'i18next';

export const changeLanguage = () => {
  i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en').catch((error) => {
    console.error('Error changing language:', error);
  });
};
