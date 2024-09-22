import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import {RootStackParamsList} from './navigationTypes.ts';
import {Screens, Stacks} from './navigationEnums.ts';
import {Cart, Auth} from 'pages';
import {useAppNavigation} from 'shared/libs/useAppNavigation.tsx';
import {MainTabsNavigator} from './stacks';
import {Header} from 'widgets';
import {Colors, TextStyles} from 'shared/libs/helpers';

export const RootNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamsList>();
  const navigation = useAppNavigation();
  const {t} = useTranslation();

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={Stacks.MAIN}
        component={MainTabsNavigator}
        options={() => ({
          header: () => <Header navigation={navigation} />,
        })}
      />
      <RootStack.Screen
        name={Screens.CART}
        component={Cart}
        options={{
          title: t('Корзина'),
          headerTitleAlign: 'center',
          headerTitleStyle: TextStyles.h2.changeColor(Colors.Green500),
        }}
      />
      <RootStack.Screen name={Screens.AUTH} component={Auth} />
    </RootStack.Navigator>
  );
};
