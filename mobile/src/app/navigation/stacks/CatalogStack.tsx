import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Catalog} from 'pages';
import {Screens} from '../navigationEnums';
import {CatalogStackParamsList} from '../navigationTypes';

export const CatalogStackNavigator = () => {
  const CatalogStack = createNativeStackNavigator<CatalogStackParamsList>();

  return (
    <CatalogStack.Navigator>
      <CatalogStack.Screen
        name={Screens.CATALOG}
        component={Catalog}
        options={{headerShown: false}}
      />
    </CatalogStack.Navigator>
  );
};
