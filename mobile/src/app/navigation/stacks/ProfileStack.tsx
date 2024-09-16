import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Profile} from 'pages';
import {Screens} from '../navigationEnums';
import {ProfileStackParamsList} from '../navigationTypes';

const ProfileStackNavigator = () => {
  const ProfileStack = createNativeStackNavigator<ProfileStackParamsList>();

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={Screens.PROFILE}
        component={Profile}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
