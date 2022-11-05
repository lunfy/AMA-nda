import { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Card, Banner, Button, Paragraph, Dialog, Portal, } from "react-native-paper";
import { auth } from "../firebase"
import { sendEmailVerification } from "firebase/auth/react-native";
import logo from '../assets/logo_black.png'

const MainMenu = (props) => {

    const img0 = require('../assets/ama.png')
    const img1 = require('../assets/cw.jpeg')
    const img2 = require('../assets/translater.jpeg')
    const img3 = require('../assets/edit.png')
    const navigation = useNavigation()

    const { colors } = useTheme();
    const [visible, setVisible] = useState(false)

    const verifiedUser = auth.currentUser.emailVerified
    console.log("jwt: ", props.mjwt)

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const sendVerify = () => {
        sendEmailVerification(auth.currentUser)
        showDialog()
    }

    const LimitAccess = (props) => {
        return (
            <View style={{ width: '50%', padding: 10, backgroundColor: colors.background }}>
                <Card style={{ backgroundColor: colors.border, borderRadius: 20 }}>
                    <Card.Content style={{ backgroundColor: colors.border, borderRadius: 20 }}>
                        { verifiedUser ? (
                        <TouchableOpacity onPress={() => navigation.navigate(props.nav)}>
                            <Image style={{ width: 130, height: 130, borderRadius: 100 }} source={props.imgSrc} />
                        </TouchableOpacity>) 
                        : 
                        (<TouchableOpacity onPress={() => alert('Verify your email address for full access!')}>
                            <Image style={{ width: 130, height: 130, borderRadius: 100 }} source={props.imgSrc} />
                        </TouchableOpacity>)
                        }
                    </Card.Content>
                </Card>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            { verifiedUser ? '' : (
            <Banner
            visible='true'
            actions={[
                {
                label: 'Send Verification Email',
                onPress: () => sendVerify(),
                },
            ]}
            icon={({size}) => (
                <Image
                source={logo}
                style={{
                    width: size,
                    height: size,
                }}
                />
            )}>
                To access the full features of the app, please confirm your email address.
            </Banner>)
            }

            <View>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Verification Email Sent</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>You are required to log in again after verifying your email.</Paragraph>
                            <Paragraph></Paragraph>
                            <Paragraph>Would you like to log out now?</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Continue</Button>
                            <Button onPress={() => auth.signOut()}>Log Out</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>

            <View style={styles.container}>
                <View style={{ width: '50%', padding: 10, backgroundColor: colors.background }}>
                    <Card style={{ backgroundColor: colors.border, borderRadius: 20 }}>
                        <Card.Content style={{ backgroundColor: colors.border, borderRadius: 20 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Ask Me Anything!')}>
                                <Image style={{ width: 130, height: 130, borderRadius: 100 }} source={img0} />
                            </TouchableOpacity>
                        </Card.Content>
                    </Card>
                </View>

                <LimitAccess nav='Code Wizard' imgSrc={img1} />
                <LimitAccess nav='Translate' imgSrc={img2} />
                <LimitAccess nav='Edit' imgSrc={img3} />
            </View>
        </View>
    );
}

export default MainMenu

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        padding: 10,
    },
    item: {
        width: '50%',
        padding: 10
    }
  })