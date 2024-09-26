import {IndexPath, Select, SelectItem} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';

import {Colors, TextStyles} from 'shared/libs/helpers';
import i18n from 'shared/libs/i18n';
import {storage} from 'shared/libs/storage';
import {useAppNavigation} from 'shared/libs/useAppNavigation';

import {SettingsStyles as styles} from './Settings.styles';

const data = ['Русский', 'English'];

export const Settings = () => {
  const {t} = useTranslation();
  const navigation = useAppNavigation();
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0),
  );

  const displayValue = data[selectedIndex.row];

  const renderOption = (item: string, ix: number) => (
    <SelectItem key={ix} title={item} />
  );

  const handleSelect = (index: IndexPath | IndexPath[]) => {
    if (Array.isArray(index)) {
      return;
    }

    const selectedLanguage = data[index.row] === 'Русский' ? 'ru' : 'en';
    setSelectedIndex(index);
    i18n.changeLanguage(selectedLanguage);

    storage.set('language', selectedLanguage);
  };

  useEffect(() => {
    const savedLanguage = storage.getString('language') || 'ru';
    i18n.changeLanguage(savedLanguage);
    const index = savedLanguage === 'ru' ? 0 : 1;
    setSelectedIndex(new IndexPath(index));
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack}>
        <Text style={TextStyles.p3.changeColor(Colors.Black200)}>
          {t('Назад')}
        </Text>
      </TouchableOpacity>
      <Text style={TextStyles.h3.changeColor(Colors.Black200)}>
        {t('Настройки')}
      </Text>

      <Text style={TextStyles.p3.changeColor(Colors.Black100)}>
        {t('Выбор языка')}
      </Text>
      <Select
        placeholder="Default"
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={handleSelect}>
        {data.map((title, ix) => renderOption(title, ix))}
      </Select>
    </View>
  );
};
