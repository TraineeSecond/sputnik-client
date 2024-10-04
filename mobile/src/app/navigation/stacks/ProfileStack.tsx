import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {NewProduct, Orders, Profile, Settings} from 'pages';

import {Screens} from '../navigationEnums';
import {ProfileStackParamsList} from '../navigationTypes';

export const ProfileStackNavigator = () => {
  const ProfileStack = createNativeStackNavigator<ProfileStackParamsList>();

  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name={Screens.PROFILE} component={Profile} />
      <ProfileStack.Screen
        name={Screens.NEWPRODUCT}
        component={NewProduct}
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
