import {createNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';

import {Auth, Cart, Product} from 'pages';
import {useAppNavigation} from 'shared/libs/useAppNavigation.tsx';
import {Header} from 'widgets';

import {Screens, Stacks} from './navigationEnums.ts';
import {
  MainTabsStackParamsList,
  RootStackParamsList,
} from './navigationTypes.ts';
import {MainTabsNavigator} from './stacks';

export const RootNavigator = () => {
  const [currentTab, setCurrentTab] = useState<keyof MainTabsStackParamsList>(
    Screens.HOME_TAB,
  );

  const RootStack = createNativeStackNavigator<RootStackParamsList>();
  const navigation = useAppNavigation();

  useEffect(() => {
    const getTab = navigationRef.current?.addListener('state', () => {
      const tab = navigationRef.current?.getCurrentRoute();
      if (tab?.name) setCurrentTab(tab.name as keyof MainTabsStackParamsList);
    });

    return getTab;
  }, []);

  return (
    <RootStack.Navigator
      screenOptions={() => ({
        header: () => <Header navigation={navigation} routeName={currentTab} />,
      })}>
      <RootStack.Screen name={Stacks.MAIN} component={MainTabsNavigator} />
      <RootStack.Screen name={Screens.PRODUCT} component={Product} />
      <RootStack.Screen name={Screens.CART} component={Cart} />
      <RootStack.Screen name={Screens.AUTH} component={Auth} />
    </RootStack.Navigator>
  );
};

export const navigationRef = createNavigationContainerRef();
