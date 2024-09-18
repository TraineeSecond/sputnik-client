import {Text, TouchableOpacity, View} from 'react-native';

import Input from 'shared/ui/Input';
import {TextStyles} from 'shared/libs/helpers';
import {LoginStyles as styles} from './styles';
import {useIsLoginStore} from 'shared/stores/isLoginStore';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {useLoginStore} from '../model/store';
import {Stacks} from 'navigation/navigationEnums';
import {useUserStore} from 'entities/user';

export const Login = () => {
  const {email, password, setEmail, setPassword, login} = useLoginStore();

  const {setIsLoginPage} = useIsLoginStore();

  const {setUser, setToken} = useUserStore();

  const navigation = useAppNavigation();

  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.message === 'Успешная авторизация') {
      setIsLoginPage(true);
      navigation.navigate(Stacks.HOME_TAB);
      setUser(result.user);
      setToken(result.token);
    }
  };

  const handleNavigate = () => {
    setIsLoginPage(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[TextStyles.h1, {marginBottom: 41, marginTop: 60}]}>
        Авторизация
      </Text>
      <Input value={email} setValue={setEmail} placeholder="Введите почту" />

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
