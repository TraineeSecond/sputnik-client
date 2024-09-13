import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../pages/Home';

export const RootNavigator = () => {
  const RootStack = createNativeStackNavigator();

  return (
    <>
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Cataloge" component={Home} />
        <RootStack.Screen name="Profile" component={Home} />
      </RootStack.Navigator>
    </>
  );
};
