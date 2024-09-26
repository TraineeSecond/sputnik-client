import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import {RootStackParamsList} from './navigationTypes.ts';
import {Screens, Stacks} from './navigationEnums.ts';
import {Cart, Auth, Product} from 'pages';
import {useAppNavigation} from 'shared/libs/useAppNavigation.tsx';
import {MainTabsNavigator} from './stacks';
import {Header} from 'widgets';
import {createNavigationContainerRef} from '@react-navigation/native';

export const RootNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamsList>();
  const navigation = useAppNavigation();
  const {t} = useTranslation();

  return (
    <RootStack.Navigator
      screenOptions={({route}) => ({
        header: () => <Header navigation={navigation} routeName={route.name} />,
      })}>
      <RootStack.Screen name={Stacks.MAIN} component={MainTabsNavigator} />
      <RootStack.Screen name={Screens.PRODUCT} component={Product} />
      <RootStack.Screen name={Screens.CART} component={Cart} />
      <RootStack.Screen name={Screens.AUTH} component={Auth} />
    </RootStack.Navigator>
  );
};

export const navigationRef = createNavigationContainerRef();
