import React from 'react';
import {View} from 'react-native';

import {useUserStore} from 'entities/user';
import {Seller} from 'features';
import {Auth} from 'pages';

export const Profile = () => {
  const {token, user, clearUserData} = useUserStore();

  const handleLogout = () => {
    clearUserData();
  };

  return (
    <>
      {token ? (
        user.role === 'seller' ? (
          <Seller user={user} onLogout={handleLogout} />
        ) : (
          <View></View>
          // <Buyer onLogout={handleLogout} />
        )
      ) : (
        <Auth />
      )}
    </>
  );
};

// export const Profile = () => {
//   const {token, user, clearUserData} = useUserStore();
//   const [selectedIndex, setSelectedIndex] = useState<IndexPath | undefined>(
//     undefined,
//   );
//   const {t} = useTranslation();

//   const navigation = useNavigation<NavigationProp<ProfileStackParamsList>>();

//   const handlePurchaseHistory = () => {
//     navigation.navigate(Screens.ORDERS);
//   };

//   const handleSettings = () => {
//     navigation.navigate(Screens.SETTINGS);
//   };

//   const handleLogout = () => {
//     clearUserData();
//   };

//   return (
//     <>
//       {token ? (
//         <View style={styles.container}>
//           <Text
//             style={[
//               TextStyles.h2.changeColor(Colors.Black200),
//               styles.textCenter,
//             ]}>
//             {t('Профиль')}
//           </Text>
//           <Image
//             style={styles.image}
//             source={require('shared/assets/images/tempimage.png')}
//           />
//           <Text
//             style={[
//               TextStyles.p2.changeColor(Colors.Black200),
//               styles.textCenter,
//             ]}>
//             {`${user.name} ${user.surname}`}
//           </Text>

//           <View style={styles.menuContainer}>
//             <Menu onSelect={index => setSelectedIndex(index)}>
//               <MenuItem
//                 title={t('История покупок')}
//                 accessoryLeft={HistoryIcon}
//                 accessoryRight={ForwardIcon}
//                 onPress={handlePurchaseHistory}
//               />
//               <MenuItem
//                 title={t('Настройки языка')}
//                 accessoryLeft={FlagIcon}
//                 accessoryRight={ForwardIcon}
//                 onPress={handleSettings}
//               />
//               <MenuItem
//                 title={t('Выйти из аккаунта')}
//                 accessoryLeft={LogOutIcon}
//                 accessoryRight={ForwardIcon}
//                 onPress={handleLogout}
//               />
//             </Menu>
//           </View>
//         </View>
//       ) : (
//         <Auth />
//       )}
//     </>
//   );
// };
