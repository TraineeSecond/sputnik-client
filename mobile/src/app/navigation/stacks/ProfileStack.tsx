import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {SellerProducts} from 'features/SellerProducts';
import {
  ChatsList,
  Messenger,
  NewProduct,
  Orders,
  Profile,
  ReviewsPoints,
  SellerDashboard,
  Settings,
} from 'pages';
import {Appeals} from 'pages/Appeals/ui/Appeals';
import {useAppNavigation} from 'shared/libs/useAppNavigation';
import {Header} from 'widgets';

import {Screens, Stacks} from '../navigationEnums';
import {ProfileStackParamsList} from '../navigationTypes';

export const ProfileStackNavigator = () => {
  const ProfileStack = createNativeStackNavigator<ProfileStackParamsList>();
  const navigation = useAppNavigation();

  const handleGoBack = () => {
    navigation.navigate(Stacks.MAIN, {
      screen: Screens.PROFILE_TAB,
      params: {
        screen: Screens.PROFILE,
      },
    });
  };

  const handleAddProduct = () => {
    navigation.navigate(Stacks.MAIN, {
      screen: Screens.PROFILE_TAB,
      params: {
        screen: Screens.NEWPRODUCT,
      },
    });
  };

  const handleGoSeller = () => {
    navigation.navigate(Stacks.MAIN, {
      screen: Screens.PROFILE_TAB,
      params: {
        screen: Screens.SELLERPRODUCTS,
      },
    });
  };

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={Screens.PROFILE}
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name={Screens.NEWPRODUCT}
        component={NewProduct}
        options={{
          header: () => <Header showBackButton onBackPress={handleGoSeller} />,
        }}
      />
      <ProfileStack.Screen
        name={Screens.ORDERS}
        component={Orders}
        options={{
          header: () => <Header showBackButton onBackPress={handleGoBack} />,
        }}
      />
      <ProfileStack.Screen
        name={Screens.SETTINGS}
        component={Settings}
        options={{
          header: () => <Header showBackButton onBackPress={handleGoBack} />,
        }}
      />
      <ProfileStack.Screen
        name={Screens.REVIEWSPOINTS}
        component={ReviewsPoints}
        options={{
          header: () => <Header showBackButton onBackPress={handleGoBack} />,
        }}
      />
      <ProfileStack.Screen
        name={Screens.CHATLIST}
        component={ChatsList}
        options={{
          header: () => <Header showBackButton onBackPress={handleGoBack} />,
        }}
      />
      <ProfileStack.Screen
        name={Screens.SELLERPRODUCTS}
        component={SellerDashboard}
        options={{
          header: () => (
            <Header
              showBackButton
              showAddButton
              onAddPress={handleAddProduct}
              onBackPress={handleGoBack}
            />
          ),
        }}
      />
      <ProfileStack.Screen
        name={Screens.APPEALS}
        component={Appeals}
        options={{
          header: () => <Header showBackButton onBackPress={handleGoBack} />,
        }}
      />
    </ProfileStack.Navigator>
  );
};
