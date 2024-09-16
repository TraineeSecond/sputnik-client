import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';

import Login from '../pages/Login';
import Register from '../pages/Register';

function App(): React.JSX.Element {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Register />
    </ApplicationProvider>
  );
}

export default App;
