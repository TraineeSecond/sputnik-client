import {useTranslation} from 'react-i18next';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {useUserStore} from 'entities/user';
import {Stacks} from 'navigation/navigationEnums';
import {TextStyles} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {useIsLoginStore} from 'shared/stores/isLoginStore';
import {Input} from 'shared/ui';

import {useLoginStore} from '../model/store';
import {LoginStyles as styles} from './styles';

export const Login = () => {
  const {t} = useTranslation();
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
      <Text
        style={[TextStyles.h1]}
        accessible={true}
        accessibilityLabel={t('Авторизация')}>
        {t('Авторизация')}
      </Text>
      <Image
        style={styles.image}
        source={require('shared/assets/images/tempimage.png')}
      />
      <View style={styles.form}>
        <Input
          value={email}
          setValue={setEmail}
          placeholder={t('Введите почту')}
          accessibilityLabel={t('Введите почту')}
          style={styles.input}
        />
        <Input
          value={password}
          setValue={setPassword}
          isPassword={true}
          placeholder={t('Введите пароль')}
          accessibilityLabel={t('Введите пароль')}
          style={styles.input}
        />

        <View style={styles.controls}>
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
            accessible={true}
            accessibilityLabel={t('Войти')}>
            <Text style={TextStyles.button1}>{t('Войти')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigate}>
            <Text
              style={TextStyles.button2}
              accessible={true}
              accessibilityLabel={t('Зарегистрироваться')}>
              {t('Зарегистрироваться')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
