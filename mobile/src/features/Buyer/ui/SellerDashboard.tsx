import {NavigationProp, useNavigation} from '@react-navigation/native';
import {IndexPath, Menu, MenuItem} from '@ui-kitten/components';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {ProfileStackParamsList} from 'app/navigation/navigationTypes';
import {useUserStore} from 'entities/user';
import {Screens, Stacks} from 'navigation/navigationEnums';
import {FlagIcon, ForwardIcon, LogOutIcon} from 'shared/icons';
import {Colors, TextStyles} from 'shared/libs/helpers';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {useIsLoginStore} from 'shared/stores/isLoginStore';
import {Input} from 'shared/ui';

import {LoginStyles as styles} from './styles';

type SellerDashboardProps = {
  user: any;
  onLogout: () => void;
};

export const SellerDashboard = ({user, onLogout}: SellerDashboardProps) => {
  const navigation = useNavigation<NavigationProp<ProfileStackParamsList>>();
  const {t} = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | undefined>(
    undefined,
  );

  const handleSettings = () => {
    navigation.navigate(Screens.SETTINGS);
  };

  return (
    <View style={styles.container}>
      <Text
        style={[TextStyles.h2.changeColor(Colors.Black200), styles.textCenter]}>
        {t('Продавец')}
      </Text>
      <Image
        style={styles.image}
        source={require('shared/assets/images/tempimage.png')}
      />
      <Text
        style={[TextStyles.p2.changeColor(Colors.Black200), styles.textCenter]}>
        {`${user.name} ${user.surname}`}
      </Text>

      <View style={styles.menuContainer}>
        <Menu onSelect={index => setSelectedIndex(index)}>
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
            onPress={onLogout}
          />
        </Menu>
      </View>
    </View>
  );
};
