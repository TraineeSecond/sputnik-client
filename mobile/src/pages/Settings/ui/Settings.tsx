import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';

import {Colors, TextStyles} from 'shared/libs/helpers';
import i18n from 'shared/libs/i18n';
import {storage} from 'shared/libs/storage';
import {CustomDropdown} from 'shared/ui/Dropdown/Dropdown';

import {SettingsStyles as styles} from './Settings.styles';

const data = ['Русский', 'English'];

export const Settings = () => {
  const {t} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(() => {
    const savedLanguage = storage.getString('language') || 'ru';
    return savedLanguage === 'ru' ? 'Русский' : 'English';
  });

  const handleSelect = (value: string) => {
    const selectedLanguageCode = value === 'Русский' ? 'ru' : 'en';
    setSelectedLanguage(value);
    i18n.changeLanguage(selectedLanguageCode);
    storage.set('language', selectedLanguageCode);
  };

  return (
    <View style={styles.container}>
      <View accessible={true} accessibilityLabel={t('Выбор языка')}>
        <Text
          style={TextStyles.p3.changeColor(Colors.Black100)}
          accessible={true}
          accessibilityLabel={t('Выбор языка')}>
          {t('Выбор языка')}
        </Text>
        <CustomDropdown
          data={data}
          value={selectedLanguage}
          onChange={handleSelect}
          placeholder={t('Выбор языка')}
        />
      </View>
    </View>
  );
};
