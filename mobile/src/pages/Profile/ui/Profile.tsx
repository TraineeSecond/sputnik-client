import React from 'react';
import {
  Icon,
  Menu,
  MenuGroup,
  MenuItem,
  IconElement,
  IndexPath,
} from '@ui-kitten/components';
import {Image, Text, View} from 'react-native';

import {useUserStore} from 'entities/user';
import {Auth} from 'pages/Auth/ui/Auth';
import {Colors, TextStyles} from 'shared/libs/helpers';
import {ProfilePageStyles as styles} from './Profile.styles';
import {
  CardIcon,
  ForwardIcon,
  HistoryIcon,
  LogOutIcon,
} from 'shared/icons/Icons';

const Profile = () => {
  const {token, user, clearUserData} = useUserStore();
  const [selectedIndex, setSelectedIndex] = React.useState<
    IndexPath | undefined
  >(undefined);

  const handlePaymentMethods = () => {
    console.log('Переход к методам оплаты');
    // navigation.navigate('PaymentMethods');
  };

  const handlePurchaseHistory = () => {
    console.log('Переход к истории покупок');
    // история покупок
  };

  // Функция для выхода из аккаунта
  const handleLogout = () => {
    clearUserData();
    console.log('Выход из аккаунта');
    // на траницу логина
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
