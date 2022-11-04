import { StyleSheet, Text, TouchableOpacity, SafeAreaView, View, ImageBackground, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import MyDrawer from '../components/MyDrawer'
   
export default HomeScreen = (props) => {

    const navigation = useNavigation()
    const jwt = props.jwtToken
    const uid = props.userId
    const reqURL = props.req
    const notURL = props.not

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
        <MyDrawer theme={props.theme} jwtToken={jwt} userId={uid} req={reqURL} not={notURL} />  
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