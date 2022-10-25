import { StyleSheet, Text, TouchableOpacity, SafeAreaView, View, ImageBackground } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import MainDrawer from '../components/Drawer'

const HomeScreen = (props) => {

    const navigation = useNavigation()

    const handleSignOut = () => {
        auth
        .signOut()
        .then(() => {
            navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    }

  return (
    <ImageBackground 
        source={props.bgImg}
        resizeMode="cover"
        style={styles.image}
        >

        <View style={styles.container}>
            <Text>Email: {auth.currentUser?.email}</Text>
            <TouchableOpacity
            onPress={handleSignOut}
            style={styles.button}
            >
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    </ImageBackground>
  )
}

export default HomeScreen

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