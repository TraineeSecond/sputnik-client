import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {useUserStore} from 'entities/user';
import {useSearchCatalogStore} from 'features/index';
import {CatalogIcon, HomeIcon, MapIcon, ProfileIcon} from 'shared/icons';
import {Colors} from 'shared/libs/helpers/colors';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {Header} from 'widgets';

import {
  CatalogStackNavigator,
  HomeStackNavigator,
  MapStackNavigator,
  ProfileStackNavigator,
} from '.';
import {Screens} from '../navigationEnums';
import {MainTabsStackParamsList} from '../navigationTypes';

export const MainTabsNavigator = () => {
  const MainTabsStack = createBottomTabNavigator<MainTabsStackParamsList>();

  const {t} = useTranslation();
  const navigation = useAppNavigation();
  const {searchText, setSearchText, fetchProducts} = useSearchCatalogStore();
  const {user} = useUserStore();

  const handleNavigateToCart = () => {
    navigation.navigate(Screens.CART);
  };

  const handleSearch = () => {
    fetchProducts();
  };

  const handleClearInput = () => {
    setSearchText('');
  };

  const showCart = user.role !== 'seller';

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
      })}>
      <MainTabsStack.Screen
        name={Screens.HOME_TAB}
        component={HomeStackNavigator}
        options={{
          title: t('Главная'),
          header: () => (
            <Header
              showTitle
              showCartButton={showCart}
              onCartPress={handleNavigateToCart}
            />
          ),
        }}
      />
      <MainTabsStack.Screen
        name={Screens.CATALOG_TAB}
        component={CatalogStackNavigator}
        options={{
          title: t('Каталог'),
          header: () => (
            <Header
              showSearchInput
              showCartButton={showCart}
              searchText={searchText}
              onSearch={handleSearch}
              setSearchText={setSearchText}
              onClearSearch={handleClearInput}
              onCartPress={handleNavigateToCart}
            />
          ),
        }}
      />
      <MainTabsStack.Screen
        name={Screens.MAP_TAB}
        component={MapStackNavigator}
        options={{
          title: t('Карта'),
          header: () => (
            <Header
              showTitle
              showCartButton
              onCartPress={handleNavigateToCart}
            />
          ),
        }}
      />
      <MainTabsStack.Screen
        name={Screens.PROFILE_TAB}
        component={ProfileStackNavigator}
        options={{title: t('Профиль'), headerShown: false}}
      />
    </MainTabsStack.Navigator>
  );
};
