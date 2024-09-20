import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {IndexPath, Select, SelectItem} from '@ui-kitten/components';

import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {SettingsStyles as styles} from './Settings.styles';
import {Colors, TextStyles} from 'shared/libs/helpers';
import i18n from 'shared/libs/i18n';
import {useTranslation} from 'react-i18next';

const data = ['Русский', 'English'];

export const Settings = () => {
  const {t} = useTranslation();
  const navigation = useAppNavigation();
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0),
  );

  const displayValue = data[selectedIndex.row];

  const renderOption = (title: string, index: number) => (
    <SelectItem key={index} title={title} />
  );

  const handleSelect = (index: IndexPath | IndexPath[]) => {
    if (Array.isArray(index)) {
      return;
    }

    setSelectedIndex(index);
    data[index.row] === 'Русский'
      ? i18n.changeLanguage('ru')
      : i18n.changeLanguage('en');
    if (data[index.row] === 'Русский') {
      i18n.changeLanguage('ru');
    } else if (data[index.row] === 'English') {
      i18n.changeLanguage('en');
    }
  };

  useEffect(() => {
    // Получаем текущий язык через i18next
    const currentLanguage = i18n.language;

    if (currentLanguage === 'ru') {
      setSelectedIndex(new IndexPath(0));
    } else if (currentLanguage === 'en') {
      setSelectedIndex(new IndexPath(1));
    }
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack}>
        <Text style={TextStyles.p3.changeColor(Colors.Black200)}>
          {t('back')}
        </Text>
      </TouchableOpacity>
      <Text style={TextStyles.h3.changeColor(Colors.Black200)}>
        {t('settings')}
      </Text>

      <Text style={TextStyles.p3.changeColor(Colors.Black100)}>
        {t('languageSelection')}
      </Text>
      <Select
        placeholder="Default"
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={handleSelect}>
        {data.map((title, index) => renderOption(title, index))}
      </Select>
    </View>
  );
};
