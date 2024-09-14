import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {TextStyles} from '../../shared/libs/helpers/textStyles';
import {Colors} from '../../shared/libs/helpers/colors';
import {LoginPageStyles as styles} from './styles';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={[TextStyles.h1, {marginBottom: 41}]}>Авторизация</Text>
      <TextInput
        value={username}
        placeholder="Введите логин"
        autoCapitalize="none"
        placeholderTextColor={Colors.Gray100}
        onChangeText={text => setUsername(text)}
        style={[styles.input, TextStyles.p1.changeColor(Colors.Gray200)]}
      />
      <TextInput
        value={password}
        placeholder="Введите пароль"
        autoCapitalize="none"
        placeholderTextColor={Colors.Gray100}
        onChangeText={text => setPassword(text)}
        style={[styles.input, TextStyles.p1.changeColor(Colors.Gray200)]}
      />

      <TouchableOpacity onPress={() => console.log(123)} style={styles.button1}>
        <Text style={TextStyles.button1}>Войти</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log(123)} style={styles.button2}>
        <Text style={TextStyles.button2}>зарегестрироваться</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
