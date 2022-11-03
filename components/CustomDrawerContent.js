import { useEffect, useState } from "react";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";
import { Linking, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from '../firebase'
import { Switch, IconButton, MD3Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const About = () => {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', marginHorizontal: 10 }}>
      <Text>
        OpenAI was founded in December 2015, by SpaceX co-founder and Tesla CEO Elon Musk, Greg Brockman from notable data startup Cloudera, and entrepreneur Rebekah Mercer. Dimitry Ioffe, Pieter Abbeel, and Patrick Mynyk are also notable founding members of OpenAI. The organization was created with the goal of advancing digital intelligence in the way that is most likely to benefit humanity as a whole. OpenAI has partnerships with investment firms such as Fidelity Investments, Andreessen Horowitz, and Obvious Ventures. Ever since it’s creation, OpenAI has made large contributions to both its citizens and AI as a whole. OpenAI Zero is an AI research lab focused on developing artificial intelligence where any AI software program can autonomously defeat any other in a much faster amount of time. OpenAI started developing this project in early 2017 and completed it by late 2017. This was a significant development as it showed that the current state of AI technology is far from any End Game Scenario.
      </Text>
    </SafeAreaView>
  );
}

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

  export { CustomDrawerContent, About }

  // <View style={{ justifyContent: 'center', alignItems: 'center' }}>
  //     <Button title='btn' onPress={()=>props.theme('dark')} />
  //     <Button title='btn2' onPress={()=>props.theme('light')} />
  // </View>