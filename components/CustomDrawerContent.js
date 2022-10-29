import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";
import { Linking, View, Text, TouchableOpacity } from "react-native";
import { auth } from '../firebase'

const Notifications = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

const About = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>About Screen</Text>
    </View>
  );
}

const handleSignOut = () => {
    auth
    .signOut()
    .catch(error => alert(error.message))
}

function CustomDrawerContent({ navigation }) {
  return (
          <DrawerContentScrollView>
            <DrawerItem
              label="Main Menu"
              onPress={() => {
                navigation.navigate('Main Menu');
              }}
            />
            <DrawerItem
              label="Notifications"
              onPress={() => {
                navigation.navigate('Notifications');
              }}
            />
            <DrawerItem
              label="About"
              onPress={() => {
                navigation.navigate('About');
              }}
            />
            <DrawerItem
              label="Github Repo"
              onPress={() => {
                Linking.openURL('https://github.com/lunfy/AMA-nda');
              }}
            />
            <DrawerItem
              label="Sign Out"
              onPress={handleSignOut}
            />
          </DrawerContentScrollView>
        );
  }

  export { CustomDrawerContent, Notifications, About }

  // <View style={{ justifyContent: 'center', alignItems: 'center' }}>
  //     <Button title='btn' onPress={()=>props.theme('dark')} />
  //     <Button title='btn2' onPress={()=>props.theme('light')} />
  // </View>