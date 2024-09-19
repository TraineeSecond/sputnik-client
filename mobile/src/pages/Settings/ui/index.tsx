import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useAppNavigation} from 'shared/libs/useAppNavigation';

export const Settings = () => {
  const navigation = useAppNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <TouchableOpacity onPress={handleGoBack}>
        <Text>Назад</Text>
      </TouchableOpacity>
      <Text>Настройки</Text>
    </View>
  );
};
