import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../navigationEnums';
import {ProfileStackParamsList} from '../navigationTypes';
import {Orders, Settings, Profile} from 'pages';

export const ProfileStackNavigator = () => {
  const ProfileStack = createNativeStackNavigator<ProfileStackParamsList>();

  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name={Screens.PROFILE} component={Profile} />
      <ProfileStack.Screen
<<<<<<< HEAD
        name={Screens.ORDERS}
        component={Orders}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name={Screens.SETTINGS}
        component={Settings}
        options={{headerShown: false}}
=======
        name={Screens.PAYMENTSMETHODS}
        component={PaymentMethods}
>>>>>>> bdf612b14e93356e942751f51326487340a6d322
      />
      <ProfileStack.Screen name={Screens.ORDERS} component={Orders} />
      <ProfileStack.Screen name={Screens.SETTINGS} component={Settings} />
    </ProfileStack.Navigator>
  );
};
