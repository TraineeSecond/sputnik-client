import {NavigatorScreenParams} from '@react-navigation/native';

import {Product} from 'entities/product';

export type ProductRouteParams = {product: Product};

export type MessengerRouteParams = {
  chatId: number;
  productName: string;
  sellerName: string;
};

export type NewProductRouteParams = {product?: Product};

export type RootStackParamsList = {
  Main: NavigatorScreenParams<MainTabsStackParamsList>;
  Cart: undefined;
  Auth: undefined;
  HomeTab: undefined;
  Product: ProductRouteParams;
  Messenger: MessengerRouteParams;
  NewProduct: NewProductRouteParams;
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
  Settings: undefined;
  Orders: undefined;
  PaymentMethods: undefined;
  ReviewsPoints: undefined;
  ChatList: undefined;
  SellerProducts: undefined;
  Messenger: MessengerRouteParams;
  NewProduct?: NewProductRouteParams;
};
