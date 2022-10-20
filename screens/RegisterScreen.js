import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'

const RegisterScreen = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            return alert("The passwords do not match!")
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Registered with email: ", user.email);
        })
        .catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        })
    }

  return (
    <ImageBackground
    source={props.bgImg}
    resizeMode="cover"
    style={styles.image}
    >
        <SafeAreaView style={styles.container}>
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

                <TextInput
                placeholder='Confirm Password'
                values={confirmPassword}
                onChangeText={cPasswordInput => setConfirmPassword(cPasswordInput)}
                style={styles.input}
                secureTextEntry
                />

                <TouchableOpacity
                onPress={() => Toaster.success('This is success message')}
                style={[styles.button, styles.buttonText]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    </ImageBackground>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 1,
        justifyContent: 'center'
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
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        marginTop: 10,
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
    }
})