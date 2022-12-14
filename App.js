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
import Edit from './screens/Edit';
import History from './screens/History'
import Notifications from './screens/Notifications'
import Toast from "react-native-toast-notifications";
import { OPEN_API_KEY, PROD_USERS_REGISTER, PROD_USERS, PROD_REQUESTS, PROD_NOTIFICATIONS } from '@env'

const OAIkey = process.env.OPEN_API_KEY
const regURL = process.env.PROD_USERS_REGISTER
const signURL = process.env.PROD_USERS
const reqURL = process.env.PROD_REQUESTS
const notURL = process.env.PROD_NOTIFICATIONS

const Stack = createNativeStackNavigator();
const image = require('./assets/RTH7GG6.jpeg')

export default function App() {

  const [theTheme, setTheTheme] = useState(useColorScheme())
  const [jwt, setJwt] = useState('')
  const [uid, setUid] = useState('')

  let scheme = theTheme

  return (
    <PaperProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false}} name="Login">
          {props => <LoginScreen bgImg={image} jwtToken={setJwt} userId={setUid} signIn={signURL} />}
          </Stack.Screen>

          <Stack.Screen options={{ headerShown: false}} name="Home">
          {props => <HomeScreen bgImg={image} theme={setTheTheme} jwtToken={jwt} req={reqURL} not={notURL} userId={uid} />}
          </Stack.Screen>

          <Stack.Screen name="Register">
          {props => <RegisterScreen bgImg={image} reg={regURL} />}
          </Stack.Screen>

          <Stack.Screen name="Ask Me Anything!">
          {props => <Ama openAiKey={OAIkey} jwtToken={jwt} userId={uid} req={reqURL} />}
          </Stack.Screen>

          <Stack.Screen name="Code Wizard">
          {props => <Code openAiKey={OAIkey} jwtToken={jwt} userId={uid} req={reqURL} />}
          </Stack.Screen>

          <Stack.Screen name="Translate">
          {props => <Translate openAiKey={OAIkey} jwtToken={jwt} userId={uid} req={reqURL} />}
          </Stack.Screen>

          <Stack.Screen name="Edit">
          {props => <Edit openAiKey={OAIkey} jwtToken={jwt} userId={uid} req={reqURL} />}
          </Stack.Screen>

          {/* <Stack.Screen name="History">
          {props => <History jwtToken={jwt} userId={uid} req={reqURL} />}
          </Stack.Screen> */}

          {/* <Stack.Screen name="Notifications">
          {props => <Notifications jwtToken={jwt} userId={uid} not={notURL} />}
          </Stack.Screen> */}

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
