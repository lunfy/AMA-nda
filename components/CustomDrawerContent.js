import { useEffect, useState } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Linking, View } from "react-native";
import { auth } from '../firebase'
import { Switch, IconButton, MD3Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const handleSignOut = () => {
    auth
    .signOut()
    .catch(error => alert(error.message))
}

function CustomDrawerContent(props) {
  
  const navigation = useNavigation()
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const setTheme = (arg) => {
    props.theme(arg)
  }

  useEffect(() => {
    if (isSwitchOn === false) {
      setTheme('')
      return
    }
    setTheme('dark')
  },[isSwitchOn])

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
              label="Usage History"
              onPress={() => {
                navigation.navigate('History');
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
            <View style={{flex: 1, flexDirection: 'row', marginTop: 300,}}>
              <View style={{ flex: 1}}>
                <IconButton
                icon="theme-light-dark"
                iconColor={MD3Colors.error50}
                size={70}
              />
              </View>
              <View style={{ flex: 1, paddingTop: 35}}>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
              </View>
            </View>
          </DrawerContentScrollView>
        );
  }

  export { CustomDrawerContent }
