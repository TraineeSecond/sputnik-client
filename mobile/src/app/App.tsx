import React from 'react';

import {RootNavigator} from './navigation/navigation';
import {Text} from 'react-native';
import Login from '../pages/Login';

function App(): React.JSX.Element {
  return (
    <>
      {/* <RootNavigator /> */}
      {/* <Text>123</Text> */}
      <Login />
    </>
  );
}

export default App;
