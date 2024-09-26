import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {CatalogIcon, HomeIcon, MapIcon, ProfileIcon} from 'shared/icons';
import {Colors} from 'shared/libs/helpers/colors';

import {
  CatalogStackNavigator,
  HomeStackNavigator,
  MapStackNavigator,
  ProfileStackNavigator,
} from '.';
import {Screens} from '../navigationEnums';
import {MainTabsStackParamsList} from '../navigationTypes';

export const MainTabsNavigator = () => {
  const {t} = useTranslation();

  const MainTabsStack = createBottomTabNavigator<MainTabsStackParamsList>();

  return (
    <MainTabsStack.Navigator
      detachInactiveScreens={false}
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          const iconProps = {fill: color, style: {width: size, height: size}};
          if (route.name === Screens.HOME_TAB)
            return <HomeIcon {...iconProps} />;
          if (route.name === Screens.CATALOG_TAB)
            return <CatalogIcon {...iconProps} />;
          if (route.name === Screens.MAP_TAB) return <MapIcon {...iconProps} />;
          if (route.name === Screens.PROFILE_TAB)
            return <ProfileIcon {...iconProps} />;
        },
        tabBarActiveTintColor: Colors.Green400,
        tabBarInactiveTintColor: Colors.Gray500,
        headerShown: false,
      })}>
      <MainTabsStack.Screen
        name={Screens.HOME_TAB}
        component={HomeStackNavigator}
        options={{title: t('Главная')}}
      />
      <MainTabsStack.Screen
        name={Screens.CATALOG_TAB}
        component={CatalogStackNavigator}
        options={{title: t('Каталог')}}
      />
      <MainTabsStack.Screen
        name={Screens.MAP_TAB}
        component={MapStackNavigator}
        options={{title: t('Карта')}}
      />
      <MainTabsStack.Screen
        name={Screens.PROFILE_TAB}
        component={ProfileStackNavigator}
        options={{title: t('Профиль')}}
      />
    </MainTabsStack.Navigator>
  );
};
