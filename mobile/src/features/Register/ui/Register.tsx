import {CheckBox, Radio} from '@ui-kitten/components';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {useUserStore} from 'entities/user';
import {Stacks} from 'navigation/navigationEnums';
import {Colors, TextStyles} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {useCartStore} from 'shared/stores/CartStore';
import {useIsLoginStore} from 'shared/stores/isLoginStore';
import {Input} from 'shared/ui';

import {useRegisterStore} from '../model/store';
import {RegisterStyles as styles} from './styles';

export const Register = () => {
  const {
    name,
    surname,
    email,
    password,
    confirmPassword,
    checked,
    setName,
    setSurname,
    setEmail,
    setPassword,
    setConfirmPassword,
    setChecked,
    register,
    clear,
  } = useRegisterStore();
  const {setIsLoginPage} = useIsLoginStore();
  const {setUser, setToken, user} = useUserStore();
  const {setBasket} = useCartStore();
  const {t} = useTranslation();

  const navigation = useAppNavigation();

  const handleRegister = async () => {
    const result = await register(email, password, checked, name, surname);
    if (result.message === t('Пользователь зарегистрирован')) {
      setIsLoginPage(true);
      clear();
      navigation.navigate(Stacks.HOME_TAB);
      setUser(result.user);
      setToken(result.token);
      if (user.role === 'buyer') setBasket(result.basket);
    }
  };

  const handleRadioChange = () => {
    setChecked(!checked);
  };

  const handleNavigate = () => {
    setIsLoginPage(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={[TextStyles.h1]}>Регистрация</Text>
        <View style={styles.form}>
          <Input
            value={name}
            setValue={setName}
            placeholder={t('Введите имя')}
          />
          <Input
            value={surname}
            setValue={setSurname}
            placeholder={t('Введите фамилию')}
          />
          <Input
            value={email}
            setValue={setEmail}
            keyboardType="email-address"
            placeholder={t('Введите почту')}
          />
          <Input
            value={password}
            setValue={setPassword}
            isPassword={true}
            placeholder={t('Введите пароль')}
          />
          <Input
            value={confirmPassword}
            setValue={setConfirmPassword}
            isPassword={true}
            placeholder={t('Подтвердите пароль')}
          />
        </View>

        <View style={styles.controls}>
          <View style={styles.seller}>
            <Text style={TextStyles.p1.changeColor(Colors.Black200)}>
              {`Зарегистрироваться\nкак продавец?`}
            </Text>
            <CheckBox checked={checked} onChange={handleRadioChange} />
          </View>
          <TouchableOpacity onPress={handleRegister} style={styles.button}>
            <Text style={TextStyles.button1}>{t('Зарегистрироваться')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigate}>
            <Text style={TextStyles.button2}>{t('Войти')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
