import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Profile} from 'pages';
import {Screens} from '../navigationEnums';
import {ProfileStackParamsList} from '../navigationTypes';
import {PaymentMethods} from 'pages/PaymentMethods';
import {Settings} from 'pages/Settings';
import {Orders} from 'pages/Orders';

const ProfileStackNavigator = () => {
  const ProfileStack = createNativeStackNavigator<ProfileStackParamsList>();

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={Screens.PROFILE}
        component={Profile}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name={Screens.PAYMENTSMETHODS}
        component={PaymentMethods}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name={Screens.ORDERS}
        component={Orders}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name={Screens.SETTINGS}
        component={Settings}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
