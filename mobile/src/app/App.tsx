import React from 'react';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './navigation/navigation';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {I18nextProvider} from 'react-i18next';
import i18n from 'shared/libs/i18n';

export const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <RootNavigator />
        </ApplicationProvider>
      </NavigationContainer>
    </I18nextProvider>
  );
};
