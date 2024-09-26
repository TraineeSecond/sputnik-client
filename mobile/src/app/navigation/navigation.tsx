import {createNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {Auth, Cart, Product} from 'pages';
import {useAppNavigation} from 'shared/libs/useAppNavigation.tsx';
import {Header} from 'widgets';

import {Screens, Stacks} from './navigationEnums.ts';
import {RootStackParamsList} from './navigationTypes.ts';
import {MainTabsNavigator} from './stacks';

export const RootNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamsList>();
  const navigation = useAppNavigation();

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
