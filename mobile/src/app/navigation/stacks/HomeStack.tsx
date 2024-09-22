import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Product} from 'pages';
import {Screens} from '../navigationEnums';
import {HomeStackParamsList} from '../navigationTypes';

export const HomeStackNavigator = () => {
  const HomeStack = createNativeStackNavigator<HomeStackParamsList>();

  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name={Screens.HOME} component={Home} />
      <HomeStack.Screen name={Screens.PRODUCT} component={Product} />
    </HomeStack.Navigator>
  );
};
