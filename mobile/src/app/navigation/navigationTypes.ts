import {NavigatorScreenParams} from '@react-navigation/native';

import {Product} from 'entities/product';

export type ProductRouteParams = {product: Product};

export type MessengerRouteParams = {chatId: number};

export type RootStackParamsList = {
  Main: NavigatorScreenParams<MainTabsStackParamsList>;
  Cart: undefined;
  Auth: undefined;
  HomeTab: undefined;
  Product: ProductRouteParams;
  Messenger: MessengerRouteParams;
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
  NewProduct: undefined;
  Settings: undefined;
  Orders: undefined;
  PaymentMethods: undefined;
  ReviewsPoints: undefined;
  ChatList: undefined;
  Messenger: MessengerRouteParams;
};
