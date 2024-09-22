import React, {useState} from 'react';
import {Menu, MenuItem, IndexPath} from '@ui-kitten/components';
import {Image, Text, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

import {Auth} from 'pages/Auth/ui/Auth';
import {Colors, TextStyles} from 'shared/libs/helpers';
import {ProfilePageStyles as styles} from './Profile.styles';
import {
  ForwardIcon,
  HistoryIcon,
  LogOutIcon,
  SettingsIcon,
} from 'shared/icons/Icons';
import {useUserStore} from 'entities/user';
import {ProfileStackParamsList} from 'app/navigation/navigationTypes';
import {Screens} from 'app/navigation/navigationEnums';

const Profile = () => {
  const {token, user, clearUserData} = useUserStore();
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | undefined>(
    undefined,
  );
  const {t} = useTranslation();

  const navigation = useNavigation<NavigationProp<ProfileStackParamsList>>();

  const handlePurchaseHistory = () => {
    navigation.navigate(Screens.ORDERS);
  };

  const handleSettings = () => {
    navigation.navigate(Screens.SETTINGS);
  };

  const handleLogout = () => {
    clearUserData();
  };

  return (
    <>
      {token ? (
        <View style={styles.container}>
          <Text
            style={[
              TextStyles.h2.changeColor(Colors.Black200),
              styles.textCenter,
            ]}>
            {t('Профиль')}
          </Text>
          <Image
            style={styles.image}
            source={require('shared/assets/images/tempimage.png')}
          />
          <Text
            style={[
              TextStyles.p2.changeColor(Colors.Black200),
              styles.textCenter,
            ]}>
            {`${user.name} ${user.surname}`}
          </Text>

          <View style={styles.menuContainer}>
            <Menu onSelect={index => setSelectedIndex(index)}>
              <MenuItem
                title={t('История покупок')}
                accessoryLeft={HistoryIcon}
                accessoryRight={ForwardIcon}
                onPress={handlePurchaseHistory}
              />
              <MenuItem
                title={t('Настройки')}
                accessoryLeft={SettingsIcon}
                accessoryRight={ForwardIcon}
                onPress={handleSettings}
              />
              <MenuItem
                title={t('Выйти из аккаунта')}
                accessoryLeft={LogOutIcon}
                accessoryRight={ForwardIcon}
                onPress={handleLogout}
              />
            </Menu>
          </View>
        </View>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default Profile;
