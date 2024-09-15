import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {TextStyles} from '../../shared/libs/helpers/textStyles';
import {Colors} from '../../shared/libs/helpers/colors';
import {LoginPageStyles as styles} from './styles';
import Input from '../../shared/ui/Input';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  async function login(email: string, password: string) {
    try {
      setIsLoading(true);
      const {data} = await axios.post('https://domennameabcdef.ru/api/login', {
        email,
        password,
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={[TextStyles.h1, {marginBottom: 41}]}>Авторизация</Text>
      <Input value={email} setValue={setEmail} placeholder="Введите логин" />

      <Input
        value={password}
        setValue={setPassword}
        isPassword={true}
        placeholder="Введите пароль"
      />

      <TouchableOpacity
        onPress={() => login(email, password)}
        style={styles.button1}>
        <Text style={TextStyles.button1}>Войти</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log(123)} style={styles.button2}>
        <Text style={TextStyles.button2}>зарегестрироваться</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
