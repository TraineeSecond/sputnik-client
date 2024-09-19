import React, {useState} from 'react';
import {Menu, MenuItem, IndexPath} from '@ui-kitten/components';
import {Image, Text, View} from 'react-native';
import {NavigationProp, NavigatorScreenParams} from '@react-navigation/native';

import {Auth} from 'pages/Auth/ui/Auth';
import {Colors, TextStyles} from 'shared/libs/helpers';
import {ProfilePageStyles as styles} from './Profile.styles';
import {
  CardIcon,
  ForwardIcon,
  HistoryIcon,
  LogOutIcon,
  SettingsIcon,
} from 'shared/icons/Icons';
import {useUserStore} from 'entities/user';
import {useNavigation} from '@react-navigation/native';
import {ProfileStackParamsList} from 'app/navigation/navigationTypes';
import {Screens} from 'app/navigation/navigationEnums';

const Profile = () => {
  const {token, user, clearUserData} = useUserStore();
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | undefined>(
    undefined,
  );

  const navigation = useNavigation<NavigationProp<ProfileStackParamsList>>();

  const handlePaymentMethods = () => {
    navigation.navigate(Screens.PAYMENTSMETHODS);
  };

  const handlePurchaseHistory = () => {
    navigation.navigate(Screens.ORDERS);
  };

  const handleSettings = () => {
    navigation.navigate(Screens.SETTINGS);
  };

  // Функция для выхода из аккаунта
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
            Профиль
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
                title="Методы оплаты"
                accessoryLeft={CardIcon}
                accessoryRight={ForwardIcon}
                onPress={handlePaymentMethods}
              />
              <MenuItem
                title="История покупок"
                accessoryLeft={HistoryIcon}
                accessoryRight={ForwardIcon}
                onPress={handlePurchaseHistory}
              />
              <MenuItem
                title="Настройки"
                accessoryLeft={SettingsIcon}
                accessoryRight={ForwardIcon}
                onPress={handleSettings}
              />
              <MenuItem
                title="Выйти из аккаунта"
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
