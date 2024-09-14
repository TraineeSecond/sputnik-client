import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Map} from '../../../pages';

const MapStackNavigator = () => {
  const MapStack = createNativeStackNavigator();

  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name="Map"
        component={Map}
        options={{headerShown: false}}
      />
    </MapStack.Navigator>
  );
};

export default MapStackNavigator;
