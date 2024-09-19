import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamsList} from './navigationTypes.ts';
import {Screens, Stacks} from './navigationEnums.ts';
import {Cart} from 'pages';
import {useAppNavigation} from 'shared/libs/useAppNavigation.tsx';
import {MainTabsNavigator} from './stacks';
import {Header} from 'widgets';
import {Auth} from 'pages';

export const RootNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamsList>();
  const navigation = useAppNavigation();

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={Stacks.MAIN}
        component={MainTabsNavigator}
        options={() => ({
          header: () => <Header navigation={navigation} />,
        })}
      />

      <RootStack.Screen name={Screens.CART} component={Cart} />
      <RootStack.Screen name={Screens.AUTH} component={Auth} />
    </RootStack.Navigator>
  );
};
