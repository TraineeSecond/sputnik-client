import React, {useEffect} from 'react';
import {useUserStore} from 'entities/user';
import {Auth} from 'pages/Auth/ui/Auth';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Colors, TextStyles} from 'shared/libs/helpers';
import {ProfilePageStyles as styles} from './Profile.styles';
import {CardIcon, ForwardIcon, LogOutIcon} from 'shared/icons/Icons';

const Profile = () => {
  const {token, user, clearUserData} = useUserStore();

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
            <TouchableOpacity style={styles.menuItem}>
              <CardIcon width={24} height={24} fill={Colors.Gray100} />
              <Text style={styles.menuItemText}>Методы оплаты</Text>
              <ForwardIcon width={24} height={24} fill={Colors.Gray100} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <CardIcon width={24} height={24} fill={Colors.Gray100} />
              <Text style={styles.menuItemText}>Методы оплаты</Text>
              <ForwardIcon width={24} height={24} fill={Colors.Gray100} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <CardIcon width={24} height={24} fill={Colors.Gray100} />
              <Text style={styles.menuItemText}>Методы оплаты</Text>
              <ForwardIcon width={24} height={24} fill={Colors.Gray100} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
              <LogOutIcon width={24} height={24} fill={Colors.Gray100} />
              <Text style={styles.menuItemText}>Выйти из аккаунта</Text>
              <ForwardIcon width={24} height={24} fill={Colors.Gray100} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default Profile;
