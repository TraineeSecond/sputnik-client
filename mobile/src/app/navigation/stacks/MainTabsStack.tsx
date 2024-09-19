import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  CatalogStackNavigator,
  HomeStackNavigator,
  MapStackNavigator,
  ProfileStackNavigator,
} from '.';
import {CatalogIcon, HomeIcon, MapIcon, ProfileIcon} from 'shared/icons/Icons';
import {Screens} from '../navigationEnums';
import {MainTabsStackParamsList} from '../navigationTypes';
import {Colors} from 'shared/libs/helpers/colors';

export const MainTabsNavigator = () => {
  const MainTabsStack = createBottomTabNavigator<MainTabsStackParamsList>();

  return (
    <MainTabsStack.Navigator
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
      />
      <MainTabsStack.Screen
        name={Screens.CATALOG_TAB}
        component={CatalogStackNavigator}
      />
      <MainTabsStack.Screen
        name={Screens.MAP_TAB}
        component={MapStackNavigator}
      />
      <MainTabsStack.Screen
        name={Screens.PROFILE_TAB}
        component={ProfileStackNavigator}
      />
    </MainTabsStack.Navigator>
  );
};
