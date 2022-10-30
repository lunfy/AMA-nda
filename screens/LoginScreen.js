import { Image,ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState,useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase'

const LoginScreen = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    const logo = require('../assets/ama-nda-resize.png')

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
            navigation.replace("Home")
        }
      })
    
      return unsubscribe
    }, [])
    
    const navToReg = () => {
        navigation.navigate('Register')
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Logged in with email: ", user.email);
            toast.show("Login Successful!", {
                type: "success",
                placement: "center",
                duration: 2000,
                animationType: "slide-in"
            })
        })
    }

  return (
    <ImageBackground 
        source={props.bgImg}
        resizeMode="cover"
        style={styles.image}
        >
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        >
            <View style={styles.logo}>
                <Image source={logo}
                resizeMethod="auto"
                resizeMode="cover" />
                </View>
            <View style={styles.inputContainer}>
                <TextInput
                placeholder='Email'
                values={email}
                onChangeText={emailInput => setEmail(emailInput)}
                style={styles.input}
                autoCapitalize='none'
                autoCorrect='false'
                />

                <TextInput
                placeholder='Password'
                values={password}
                onChangeText={passwordInput => setPassword(passwordInput)}
                style={styles.input}
                secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={handleSignIn}
                style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={navToReg}
                style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16
    },
    image: {
        flex: 1,
        justifyContent: 'center'
    },
    logo: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        borderRadius: 10,
        marginBottom: 10
    }
})