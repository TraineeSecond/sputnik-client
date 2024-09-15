import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Radio} from '@ui-kitten/components';

import {TextStyles} from '../../shared/libs/helpers/textStyles';
import {Colors} from '../../shared/libs/helpers/colors';
import {RegisterPageStyles as styles} from './styles';
import Input from '../../shared/ui/Input';
import axios from 'axios';

const Login = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [checked, setChecked] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  async function register(
    email: string,
    password: string,
    checked: boolean,
    name: string,
  ) {
    try {
      setIsLoading(true);
      console.log(email, password, checked, name);
      const {data} = await axios.post(
        'https://domennameabcdef.ru/api/register',
        {
          email,
          password,
          role: checked ? 'seller' : 'buyer',
          name,
        },
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }

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

        <Radio
          checked={checked}
          onChange={nextChecked => setChecked(nextChecked)}
        />
      </View>

      <TouchableOpacity
        onPress={() => register(email, password, checked, name)}
        style={styles.button1}>
        <Text style={TextStyles.button1}>ЗАРЕГЕСТРИРОВАТЬСЯ</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log(123)} style={styles.button2}>
        <Text style={TextStyles.button2}>войти</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
