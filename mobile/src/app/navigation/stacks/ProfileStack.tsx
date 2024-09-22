import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../navigationEnums';
import {ProfileStackParamsList} from '../navigationTypes';
import {PaymentMethods, Orders, Settings, Profile} from 'pages';

export const ProfileStackNavigator = () => {
  const ProfileStack = createNativeStackNavigator<ProfileStackParamsList>();

  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name={Screens.PROFILE} component={Profile} />
      <ProfileStack.Screen
        name={Screens.PAYMENTSMETHODS}
        component={PaymentMethods}
      />
      <ProfileStack.Screen name={Screens.ORDERS} component={Orders} />
      <ProfileStack.Screen name={Screens.SETTINGS} component={Settings} />
    </ProfileStack.Navigator>
  );
};
