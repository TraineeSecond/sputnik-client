import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {Map} from 'pages';

import {Screens} from '../navigationEnums';
import {MapStackParamsList} from '../navigationTypes';

export const MapStackNavigator = () => {
  const MapStack = createNativeStackNavigator<MapStackParamsList>();

  return (
    <MapStack.Navigator screenOptions={{headerShown: false}}>
      <MapStack.Screen name={Screens.MAP} component={Map} />
    </MapStack.Navigator>
  );
};
