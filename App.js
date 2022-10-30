import * as React from 'react';
import { useState } from 'react'
import { AppRegistry, StyleSheet, useColorScheme } from 'react-native';
import { name as appName } from './app.json'
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import Ama from './screens/AMA';
import Code from './screens/Code'
import Translate from './screens/Translate';
import Toast from "react-native-toast-notifications";

const Stack = createNativeStackNavigator();
const image = require('./assets/RTH7GG6.jpeg')

export default function App() {

  const [theTheme, setTheTheme] = useState(useColorScheme())

  let scheme = theTheme

  return (
    <PaperProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false}} name="Login">
          {props => <LoginScreen bgImg={image} />}
          </Stack.Screen>

          <Stack.Screen options={{ headerShown: false}} name="Home">
          {props => <HomeScreen bgImg={image} theme={setTheTheme} />}
          </Stack.Screen>

          <Stack.Screen name="Register">
          {props => <RegisterScreen bgImg={image} />}
          </Stack.Screen>

          <Stack.Screen name="Ask Me Anything!">
          {props => <Ama bgImg={image} />}
          </Stack.Screen>

          <Stack.Screen name="Code Wizard">
          {props => <Code bgImg={image} />}
          </Stack.Screen>

          <Stack.Screen name="Translate">
          {props => <Translate bgImg={image} />}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
      <Toast ref={(ref) => global['toast'] = ref} />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
