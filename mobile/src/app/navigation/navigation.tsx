import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createNavigationContainerRef} from '@react-navigation/native';
import {MainTabsNavigator} from './Stacks/index.ts';
import {Screens, Stacks} from './navigationEnums.ts';
import {TouchableOpacity} from 'react-native';
import {Cart} from '../../pages';
import {CartIcon, TruckIcon} from '../../shared/icons/Icons.tsx';

export const RootNavigator = () => {
  const RootStack = createNativeStackNavigator();

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={Stacks.MAIN}
        component={MainTabsNavigator}
        options={({navigation}) => ({
          headerTitle: 'GOZON',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate(Screens.HOME)}>
              <TruckIcon
                fill="green"
                style={{width: 24, height: 24, marginLeft: 15, marginRight: 5}}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate(Screens.CART)}>
              <CartIcon
                fill="gray"
                style={{width: 24, height: 24, marginRight: 15}}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <RootStack.Screen name={Screens.CART} component={Cart} />
    </RootStack.Navigator>
  );
};

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    //@ts-ignore
    navigationRef.navigate(name, params);
  }
}
