import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import React from 'react';
import {I18nextProvider} from 'react-i18next';

import i18n from 'shared/libs/i18n';

import {RootNavigator, navigationRef} from './navigation/navigation';

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
