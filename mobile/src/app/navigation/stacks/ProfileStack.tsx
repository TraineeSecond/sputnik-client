import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {
  ChatList,
  NewProduct,
  Orders,
  Profile,
  ReviewsPoints,
  Settings,
} from 'pages';
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
          header: () => <Header showBackButton onBackPress={handleGoBack} />,
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
        component={ChatList}
        options={{
          header: () => <Header showBackButton onBackPress={handleGoBack} />,
        }}
      />
    </ProfileStack.Navigator>
  );
};
