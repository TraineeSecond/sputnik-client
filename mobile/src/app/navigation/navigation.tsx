import {createNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {Auth, Cart, Messenger, NewProduct, Product} from 'pages';
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
        name={Screens.NEWPRODUCT}
        component={NewProduct}
        options={{
          header: () => <Header showBackButton onBackPress={handleGoBack} />,
        }}
      />
      <RootStack.Screen
        name={Screens.MESSENGER}
        component={Messenger}
        options={({route}) => {
          return {
            header: () => (
              <Header
                showBackButton
                onBackPress={handleGoBack}
                productName={route.params.productName}
                sellerName={route.params.sellerName}
              />
            ),
          };
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
