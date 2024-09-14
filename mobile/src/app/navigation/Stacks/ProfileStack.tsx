import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Profile} from '../../../pages';

const ProfileStackNavigator = () => {
  const ProfileStack = createNativeStackNavigator();

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
