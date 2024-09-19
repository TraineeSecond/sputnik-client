import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from 'pages';
import {Screens} from '../navigationEnums';
import {HomeStackParamsList} from '../navigationTypes';

export const HomeStackNavigator = () => {
  const HomeStack = createNativeStackNavigator<HomeStackParamsList>();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={Screens.HOME}
        component={Home}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};
