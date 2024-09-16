import {Text, TouchableOpacity, View} from 'react-native';

import {TextStyles} from '../../shared/libs/helpers/textStyles';
import {LoginPageStyles as styles} from './styles';
import Input from '../../shared/ui/Input';
import {useLoginStore} from './model/store';

const Login = () => {
  const {email, password, setEmail, setPassword, login} = useLoginStore();

  const handleLogin = async () => {
    const result = await login(email, password);
  };

  const handleNavigate = () => {};

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

      <TouchableOpacity onPress={handleLogin} style={styles.button1}>
        <Text style={TextStyles.button1}>Войти</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNavigate} style={styles.button2}>
        <Text style={TextStyles.button2}>зарегестрироваться</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
