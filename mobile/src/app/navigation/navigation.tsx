import {createNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {Auth, Cart, Product} from 'pages';
import {useAppNavigation} from 'shared/libs/useAppNavigation.tsx';
import {Header} from 'widgets';

import {Screens, Stacks} from './navigationEnums.ts';
import {RootStackParamsList} from './navigationTypes.ts';
import {MainTabsNavigator} from './stacks';

export const RootNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamsList>();
  const navigation = useAppNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const {t} = useTranslation();

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={Stacks.MAIN}
        component={MainTabsNavigator}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={Screens.PRODUCT}
        component={Product}
        options={{
          header: () => <Header showBackButton onBackPress={handleGoBack} />,
        }}
      />
      <RootStack.Screen
        name={Screens.CART}
        component={Cart}
        options={{
          header: () => <Header showBackButton onBackPress={handleGoBack} />,
        }}
      />
      <RootStack.Screen name={Screens.AUTH} component={Auth} />
    </RootStack.Navigator>
  );
};

export const navigationRef = createNavigationContainerRef();
