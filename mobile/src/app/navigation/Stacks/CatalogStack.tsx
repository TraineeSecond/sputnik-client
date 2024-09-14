import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Catalog} from '../../../pages';
import {Screens} from '../navigationEnums';

const CatalogStackNavigator = () => {
  const CatalogStack = createNativeStackNavigator();

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

export default CatalogStackNavigator;
