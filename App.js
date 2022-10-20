import * as React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json'
import { Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();
const image = require('./assets/RTH7GG6.jpeg')

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false}} name="Login">
          {props => <LoginScreen bgImg={image} />}
          </Stack.Screen>

          <Stack.Screen options={{ headerShown: false}} name="Home">
          {props => <HomeScreen bgImg={image} />}
          </Stack.Screen>

          <Stack.Screen name="Register">
          {props => <RegisterScreen bgImg={image} />}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
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
