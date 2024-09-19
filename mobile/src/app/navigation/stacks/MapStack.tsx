import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Map} from 'pages';
import {Screens} from '../navigationEnums';
import {MapStackParamsList} from '../navigationTypes';

export const MapStackNavigator = () => {
  const MapStack = createNativeStackNavigator<MapStackParamsList>();

  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name={Screens.MAP}
        component={Map}
        options={{headerShown: false}}
      />
    </MapStack.Navigator>
  );
};
