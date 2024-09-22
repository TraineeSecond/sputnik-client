import {NavigatorScreenParams} from '@react-navigation/native';
import {Product} from 'entities/product';

export type ProductRouteParams = {product: Product};

export type RootStackParamsList = {
  Main: NavigatorScreenParams<MainTabsStackParamsList>;
  Cart: undefined;
  Auth: undefined;
  HomeTab: undefined;
  Product: ProductRouteParams;
};

export type MainTabsStackParamsList = {
  HomeTab: NavigatorScreenParams<HomeStackParamsList>;
  CatalogTab: NavigatorScreenParams<CatalogStackParamsList>;
  MapTab: NavigatorScreenParams<MapStackParamsList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamsList>;
};

export type HomeStackParamsList = {
  Home: undefined;
  Product: ProductRouteParams;
};

export type CatalogStackParamsList = {
  Catalog: undefined;
  Product: ProductRouteParams;
};

export type MapStackParamsList = {
  Map: undefined;
};

export type ProfileStackParamsList = {
  Profile: undefined;
  Settings: undefined;
  Orders: undefined;
  PaymentMethods: undefined;
};
