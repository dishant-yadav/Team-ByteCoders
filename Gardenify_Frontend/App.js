import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  Splash,
  Onboarding,
  Login,
  SignUp,
  MainContainer,
  QRCode,
  QR,
} from './pages';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MainContainer" component={MainContainer} />
        <Stack.Screen name="QRCode" component={QRCode} />
        <Stack.Screen name="QR" component={QR} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
