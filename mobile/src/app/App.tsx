import React from 'react';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef, RootNavigator} from './navigation/navigation';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {I18nextProvider} from 'react-i18next';
import i18n from 'shared/libs/i18n';

export const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <I18nextProvider i18n={i18n}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <RootNavigator />
        </ApplicationProvider>
      </I18nextProvider>
    </NavigationContainer>
  );
};
export {navigationRef};
