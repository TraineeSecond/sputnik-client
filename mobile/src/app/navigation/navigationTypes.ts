import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamsList = {
  Main: NavigatorScreenParams<MainTabsStackParamsList>;
  Cart: undefined;
  Auth: undefined;
  HomeTab: undefined;
};

export type MainTabsStackParamsList = {
  HomeTab: NavigatorScreenParams<HomeStackParamsList>;
  CatalogTab: NavigatorScreenParams<CatalogStackParamsList>;
  MapTab: NavigatorScreenParams<MapStackParamsList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamsList>;
};

export type HomeStackParamsList = {
  Home: undefined;
};

export type CatalogStackParamsList = {
  Catalog: undefined;
};

export type MapStackParamsList = {
  Map: undefined;
};

export type ProfileStackParamsList = {
  Profile: undefined;
};
