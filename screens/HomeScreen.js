import { StyleSheet, Text, TouchableOpacity, SafeAreaView, View, ImageBackground, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTheme } from "@react-navigation/native";
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { CustomDrawerContent, Notifications, About } from '../components/CustomDrawerContent'
import MainMenu from './MainMenu';
  
  const Drawer = createDrawerNavigator();
  
  const MyDrawer = (props) => {

    const setIt = (param) => {
        props.theme(param)
    }

    return (
      <Drawer.Navigator
        screenOptions={{
            drawerStyle: {
                width: 200
            }
        }}
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Main Menu">
            {props => <MainMenu theme={setIt} bgImg={props.bgImg} /> }
        </Drawer.Screen>
        <Drawer.Screen name="About" component={About} />
        <Drawer.Screen name="Notifications" component={Notifications} />
      </Drawer.Navigator>
    );
  }
  

   
export default function HomeScreen(props) {

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (!user) {
              navigation.replace("Login")
          }
        })
      
        return unsubscribe
      }, [])

  return (
    <>
        <MyDrawer theme={props.theme}/>  
    </>
  )
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    button: {
        backgroundColor: '#0782F9',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 40
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    image: {
        flex: 1,
        justifyContent: 'center'
    }
})