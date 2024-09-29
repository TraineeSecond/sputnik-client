import {Text, TouchableOpacity, View} from 'react-native';

import {useUserStore} from 'entities/user';
import {Stacks} from 'navigation/navigationEnums';
import {TextStyles} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {useIsLoginStore} from 'shared/stores/isLoginStore';
import {Input} from 'shared/ui';

import {useLoginStore} from '../model/store';
import {LoginStyles as styles} from './styles';

export const Login = () => {
  const {email, password, setEmail, setPassword, login, clear} =
    useLoginStore();

  const {setIsLoginPage} = useIsLoginStore();

  const {setUser, setToken} = useUserStore();

  const navigation = useAppNavigation();

  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.message === 'Успешная авторизация') {
      setIsLoginPage(true);
      clear();
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
        <Text style={TextStyles.button2}>Зарегистрироваться</Text>
      </TouchableOpacity>
    </View>
  );
};
