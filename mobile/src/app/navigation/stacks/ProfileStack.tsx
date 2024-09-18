import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Profile} from 'pages';
import {Screens} from '../navigationEnums';
import {ProfileStackParamsList} from '../navigationTypes';
import {AuthUi as Auth} from 'pages';

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
        name={Screens.AUTH}
        component={Auth}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
