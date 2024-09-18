import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Radio} from '@ui-kitten/components';

import Input from 'shared/ui/Input';
import {Colors, TextStyles} from 'shared/libs/helpers';
import {RegisterStyles as styles} from './styles';
import {useRegisterStore} from '../model/store';
import {useIsLoginStore} from 'shared/stores/isLoginStore';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {useUserStore} from 'entities/user';
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
  } = useRegisterStore();
  const {setIsLoginPage} = useIsLoginStore();
  const {setUser} = useUserStore();

  const navigation = useAppNavigation();

  const handleRegister = async () => {
    const result = await register(email, password, checked, name);
    if (result.message === 'Пользователь зарегистрирован') {
      setIsLoginPage(false);
      navigation.navigate('HomeTab');
      setUser(result.user);
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
      <Text style={[TextStyles.h1, {marginBottom: 41}]}>Регистрация</Text>
      <Input value={name} setValue={setName} placeholder="Введите имя" />

      <Input
        value={surname}
        setValue={setSurname}
        placeholder="Введите фамилию"
      />

      <Input
        value={email}
        setValue={setEmail}
        isEmail={true}
        placeholder="Введите почту"
      />

      <Input
        value={password}
        setValue={setPassword}
        isPassword={true}
        placeholder="Введите пароль"
      />

      <Input
        value={confirmPassword}
        setValue={setConfirmPassword}
        isPassword={true}
        placeholder="Подтвердите пароль"
      />

      <View style={styles.containerseller}>
        <View>
          <Text style={TextStyles.p3.changeColor(Colors.Black200)}>
            Зарегестрироваться как
          </Text>
          <Text style={TextStyles.p3.changeColor(Colors.Black200)}>
            продавец?
          </Text>
        </View>

        <Radio checked={checked} onChange={handleRadioChange} />
      </View>

      <TouchableOpacity onPress={handleRegister} style={styles.button1}>
        <Text style={TextStyles.button1}>ЗАРЕГЕСТРИРОВАТЬСЯ</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNavigate} style={styles.button2}>
        <Text style={TextStyles.button2}>войти</Text>
      </TouchableOpacity>
    </View>
  );
};
