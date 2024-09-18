import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamsList} from './navigationTypes.ts';
import {Screens, Stacks} from './navigationEnums.ts';
import {TouchableOpacity} from 'react-native';
import {Cart} from 'pages';
import {CartIcon, TruckIcon} from 'shared/icons/Icons';
import {useAppNavigation} from 'shared/libs/useAppNavigation.tsx';
import {Colors, IconStyles} from 'shared/libs/helpers';
import {MainTabsNavigator} from './stacks';
import {Auth} from 'pages/Auth';

export const RootNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamsList>();
  const navigation = useAppNavigation();

  const handleNavigateToHome = () => {
    navigation.navigate(Stacks.HOME_TAB);
  };

  const handleNavigateToCart = () => {
    navigation.navigate(Screens.CART);
  };

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={Stacks.MAIN}
        component={MainTabsNavigator}
        options={() => ({
          headerTitle: 'GOZON',
          headerLeft: () => (
            <TouchableOpacity onPress={handleNavigateToHome}>
              <TruckIcon
                width={IconStyles.medium.width}
                height={IconStyles.medium.height}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleNavigateToCart}>
              <CartIcon
                fill={IconStyles.medium.changeColor(Colors.Gray100).color}
                width={IconStyles.medium.width}
                height={IconStyles.medium.height}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <RootStack.Screen name={Screens.CART} component={Cart} />
      <RootStack.Screen name={Screens.AUTH} component={Auth} />
    </RootStack.Navigator>
  );
};
