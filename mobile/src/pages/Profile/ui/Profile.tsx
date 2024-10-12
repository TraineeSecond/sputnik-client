import {NavigationProp, useNavigation} from '@react-navigation/native';
import {IndexPath, Menu, MenuItem} from '@ui-kitten/components';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';

import {Screens} from 'app/navigation/navigationEnums';
import {ProfileStackParamsList} from 'app/navigation/navigationTypes';
import {useUserStore} from 'entities/user';
import {Auth} from 'pages/index';
import {
  CubeIcon,
  FlagIcon,
  ForwardIcon,
  HistoryIcon,
  LogOutIcon,
  MessageIcon,
  ProductIcon,
  ReviewIcon,
} from 'shared/icons';
import {Colors, TextStyles} from 'shared/libs/helpers';

import {ProfileStyles as styles} from './Profile.styles';

export const Profile = () => {
  const {token, user, clearUserData} = useUserStore();
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | undefined>(
    undefined,
  );
  const {t} = useTranslation();

  const navigation = useNavigation<NavigationProp<ProfileStackParamsList>>();

  const handleLogout = () => {
    clearUserData();
  };

  const handlePurchaseHistory = () => {
    navigation.navigate(Screens.ORDERS);
  };

  const handleReviewsPoints = () => {
    navigation.navigate(Screens.REVIEWSPOINTS);
  };

  const handleSettings = () => {
    navigation.navigate(Screens.SETTINGS);
  };

  const handleAddProduct = () => {
    navigation.navigate(Screens.NEWPRODUCT);
  };

  const handleSellerProducts = () => {
    navigation.navigate(Screens.SELLERPRODUCTS);
  };

  const handleChat = () => {
    navigation.navigate(Screens.CHATLIST);
  };

  const renderSellerInterface = () => (
    <>
      <MenuItem
        title={t('Добавить продукт')}
        accessoryLeft={CubeIcon}
        accessoryRight={ForwardIcon}
        onPress={handleAddProduct}
      />
      <MenuItem
        title={t('Мои продукты')}
        accessoryLeft={HistoryIcon}
        accessoryRight={ForwardIcon}
        onPress={handlePurchaseHistory}
      />
    </>
  );

  const renderBuyerInterface = () => (
    <>
      <MenuItem
        title={t('История покупок')}
        accessoryLeft={HistoryIcon}
        accessoryRight={ForwardIcon}
        onPress={handlePurchaseHistory}
      />
      <MenuItem
        title={t('Отзывы пунктов выдачи заказов')}
        accessoryLeft={ReviewIcon}
        accessoryRight={ForwardIcon}
        onPress={handleReviewsPoints}
      />
    </>
  );

  const isSeller = user.role === 'seller';

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
              {isSeller ? renderSellerInterface() : renderBuyerInterface()}
              <MenuItem
                title={t('Сообщения')}
                accessoryLeft={MessageIcon}
                accessoryRight={ForwardIcon}
                onPress={handleChat}
              />
              <MenuItem
                title={t('Настройки языка')}
                accessoryLeft={FlagIcon}
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
