import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';

import {RootNavigator} from './navigation/navigation';
import Login from '../pages/Login';
import Register from '../pages/Register';

function App(): React.JSX.Element {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Login />
    </ApplicationProvider>
  );
}

export default App;
