import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {Catalog} from 'pages';

import {Screens} from '../navigationEnums';
import {CatalogStackParamsList} from '../navigationTypes';

export const CatalogStackNavigator = () => {
  const CatalogStack = createNativeStackNavigator<CatalogStackParamsList>();

  return (
    <CatalogStack.Navigator screenOptions={{headerShown: false}}>
      <CatalogStack.Screen name={Screens.CATALOG} component={Catalog} />
    </CatalogStack.Navigator>
  );
};
